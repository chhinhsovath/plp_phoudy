import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { HomeworkSubmission } from 'src/entities/homework-submission.entity';
import { SubmissionFile } from 'src/entities/submission-files.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { SubmissionStatus, CheckedStatus } from './dto/homework-submission.dto';
import { CreateStudentSubmissionDto } from './dto/homework-submission-student.dto';
import { UpdateTeacherFeedbackDto } from './dto/homework-submission-teacher.dto';
import { unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class HomeworkSubmissionService {
  constructor(
    @InjectRepository(HomeworkSubmission)
    private readonly submissionRepo: Repository<HomeworkSubmission>,

    @InjectRepository(SubmissionFile)
    private readonly submissionFileRepo: Repository<SubmissionFile>, // <== Inject here
  ) {}

  async findAll(): Promise<HomeworkSubmission[]> {
    return this.submissionRepo.find({
      relations: [
        'homework',
        'submissionFiles',
        'checkedByTeacher',
        'student',
        'student.user',
        'student.class',
      ],
    });
  }

  async findOne(id: number): Promise<HomeworkSubmission> {
    const submission = await this.submissionRepo.findOne({
      where: { id },
      relations: [
        'homework',
        'submissionFiles',
        'checkedByTeacher',
        'student',
        'student.user',
        'student.class',
      ],
    });
    if (!submission) {
      throw new NotFoundException(`Submission not found with ID: ${id}`);
    }
    return submission;
  }

  async create(dto: CreateStudentSubmissionDto): Promise<HomeworkSubmission> {
    // Fetch the homework to check allowResubmit and deadline
    const homework = await this.submissionRepo.manager
      .getRepository('Homework')
      .findOne({
        where: { id: dto.homeworkId },
      });
    if (!homework) {
      throw new NotFoundException('Homework not found');
    }
    // Block all actions after the deadline
    const now = new Date();
    if (homework.dueDate && now > new Date(homework.dueDate)) {
      throw new Error(
        'The deadline for this homework has passed. No further submissions are allowed.',
      );
    }
    // If allowResubmit is false, check if a submission already exists for this student and homework
    if (!homework.allowResubmit) {
      const existing = await this.submissionRepo.findOne({
        where: { homework: { id: dto.homeworkId }, studentId: dto.studentId },
      });
      if (existing) {
        if (existing.checkedStatus === 'CHECKED') {
          throw new Error(
            'Your submission has already been reviewed by your teacher and cannot be changed or resubmitted. If you have concerns, please contact your teacher.',
          );
        }
        throw new Error(
          'You have already submitted this homework. Resubmission is not allowed.',
        );
      }
    }
    // Step 1: Create and save submission first
    const submission = this.submissionRepo.create({
      submissionText: dto.submissionText,
      studentId: dto.studentId,
      submittedAt: dto.submittedAt || new Date(),
      homework: { id: dto.homeworkId },
      status: SubmissionStatus.SUBMITTED,
    });

    const savedSubmission = await this.submissionRepo.save(submission);

    // Step 2: Save submission files if provided
    if (dto.submissionFiles && dto.submissionFiles.length > 0) {
      const files = dto.submissionFiles.map((fileDto) =>
        this.submissionFileRepo.create({
          name: fileDto.name,
          size: fileDto.size,
          type: fileDto.type,
          url: fileDto.url,
          submission: savedSubmission, // important!
        }),
      );
      await this.submissionFileRepo.save(files);
      // Assign back to submission for return if needed
      savedSubmission.submissionFiles = files;
    }

    return savedSubmission;
  }

  async update(
    id: number,
    dto: UpdateTeacherFeedbackDto & {
      studentId?: number;
      submissionFiles?: any[];
      filesToDelete?: number[];
    },
    options?: { isTeacher?: boolean },
  ) {
    const submission = await this.submissionRepo.findOne({
      where: { id },
      relations: ['homework', 'submissionFiles'],
    });
    if (!submission) throw new NotFoundException('Submission not found');

    // Fetch the homework to check allowResubmit and deadline
    const homeworkId = submission.homework?.id;
    const homework =
      submission.homework ||
      (homeworkId
        ? await this.submissionRepo.manager
            .getRepository('Homework')
            .findOne({ where: { id: homeworkId } })
        : undefined);
    if (!homework) {
      throw new NotFoundException('Homework not found');
    }
    // Only enforce for students
    if (!options?.isTeacher) {
      const now = new Date();
      if (homework.dueDate && now > new Date(homework.dueDate)) {
        throw new Error(
          'The deadline for this homework has passed. No further updates are allowed.',
        );
      }
      if (!homework.allowResubmit) {
        throw new Error(
          'You cannot update this submission. Resubmission is not allowed.',
        );
      }
      if (submission.checkedStatus === 'CHECKED') {
        throw new Error(
          'This submission has already been reviewed by your teacher and cannot be updated. If you need to make changes, please contact your teacher.',
        );
      }
    } else {
      // For teachers, only allow feedback after the deadline
      const now = new Date();
      if (homework.dueDate && now <= new Date(homework.dueDate)) {
        throw new Error(
          'You can only provide feedback after the homework deadline has passed. Please wait until the due date is over to give feedback or a score.',
        );
      }
    }
    // Handle file deletions
    if (dto.filesToDelete && dto.filesToDelete.length > 0) {
      let filesFlat = Array.isArray(dto.filesToDelete)
        ? dto.filesToDelete
        : [dto.filesToDelete];
      filesFlat = filesFlat.filter((file) => !Array.isArray(file));
      const filesToDelete = await this.submissionFileRepo.findByIds(filesFlat);
      for (const file of filesToDelete) {
        try {
          const filePath = join(
            process.cwd(),
            file.url.startsWith('/') ? file.url.substring(1) : file.url,
          );
          unlinkSync(filePath);
        } catch (err) {
          console.warn(
            'Failed to delete file from server:',
            file.url,
            err.message,
          );
        }
      }
      await this.submissionFileRepo.delete(filesFlat);
    }
    // Add new files if provided
    if (dto.submissionFiles && dto.submissionFiles.length > 0) {
      let filesFlat = dto.submissionFiles.reduce(
        (acc, val) => acc.concat(val),
        [],
      );
      filesFlat = filesFlat.filter((file) => !Array.isArray(file));
      const fileEntities = filesFlat.map((file) =>
        this.submissionFileRepo.create({ ...file, submission }),
      );
      await this.submissionFileRepo.save(fileEntities);
    }
    // Update other fields
    const { checkedByTeacherId, ...restDto } = dto;
    Object.assign(submission, restDto); // works with any update dto
    // Set checkedByTeacher relation if provided
    if (checkedByTeacherId) {
      submission.checkedByTeacher = {
        teacherId: checkedByTeacherId,
      } as Teacher;
    } else if ('checkedByTeacherId' in dto) {
      submission.checkedByTeacher = undefined;
    }
    return this.submissionRepo.save(submission);
  }

  async findByHomeworkId(homeworkId: number): Promise<HomeworkSubmission[]> {
    return this.submissionRepo.find({
      where: { homework: { id: homeworkId } },
      relations: [
        'homework',
        'submissionFiles',
        'checkedByTeacher',
        'student',
        'student.user',
        'student.class',
      ],
    });
  }

  async findByStudentId(studentId: number): Promise<HomeworkSubmission[]> {
    return this.submissionRepo.find({
      where: { studentId },
      relations: [
        'homework',
        'submissionFiles',
        'checkedByTeacher',
        'student',
        'student.user',
        'student.class',
      ],
    });
  }

  async searchSubmissions(filter: {
    studentId?: number;
    homeworkId?: number;
    status?: string;
    checkedStatus?: string;
    page?: number;
    limit?: number;
    overdue?: boolean;
  }): Promise<{ data: HomeworkSubmission[]; total: number }> {
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const now = new Date();

    const qb = this.submissionRepo
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.homework', 'homework')
      .leftJoinAndSelect('submission.submissionFiles', 'submissionFiles')
      .leftJoinAndSelect('submission.checkedByTeacher', 'checkedByTeacher');

    if (filter.studentId) {
      qb.andWhere('submission.studentId = :studentId', {
        studentId: filter.studentId,
      });
    }

    if (filter.homeworkId) {
      qb.andWhere('homework.id = :homeworkId', {
        homeworkId: filter.homeworkId,
      });
    }

    if (
      filter.status &&
      Object.values(SubmissionStatus).includes(
        filter.status as SubmissionStatus,
      )
    ) {
      qb.andWhere('submission.status = :status', { status: filter.status });
    }

    if (
      filter.checkedStatus &&
      Object.values(CheckedStatus).includes(
        filter.checkedStatus as CheckedStatus,
      )
    ) {
      qb.andWhere('submission.checkedStatus = :checkedStatus', {
        checkedStatus: filter.checkedStatus,
      });
    }

    if (filter.overdue !== undefined) {
      if (filter.overdue) {
        qb.andWhere('homework.dueDate < :now', { now }).andWhere(
          '(submission.status IS NULL OR submission.status != :submitted)',
          { submitted: SubmissionStatus.SUBMITTED },
        );
      } else {
        qb.andWhere('homework.dueDate >= :now', { now });
      }
    }

    qb.skip((page - 1) * limit).take(limit);
    qb.orderBy('submission.submittedAt', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return { data, total };
  }

  async remove(id: number): Promise<void> {
    const submission = await this.submissionRepo.findOne({
      where: { id },
      relations: ['homework'],
    });
    if (!submission) {
      throw new NotFoundException(`Submission not found with ID: ${id}`);
    }
    // Fetch the homework to check allowResubmit and deadline
    const homeworkId = submission.homework?.id;
    const homework =
      submission.homework ||
      (homeworkId
        ? await this.submissionRepo.manager
            .getRepository('Homework')
            .findOne({ where: { id: homeworkId } })
        : undefined);
    if (!homework) {
      throw new NotFoundException('Homework not found');
    }
    // Block all actions after the deadline
    const now = new Date();
    if (homework.dueDate && now > new Date(homework.dueDate)) {
      throw new Error(
        'The deadline for this homework has passed. No further deletions are allowed.',
      );
    }
    if (!homework.allowResubmit) {
      throw new Error(
        'You cannot delete this submission. Resubmission is not allowed.',
      );
    }
    if (submission.checkedStatus === 'CHECKED') {
      throw new Error(
        'This submission has already been reviewed by your teacher and cannot be deleted. If you have concerns, please contact your teacher.',
      );
    }
    await this.submissionRepo.remove(submission);
  }

  async countSubmissions(filter: {
    studentId?: number;
    status?: SubmissionStatus;
    checkedStatus?: CheckedStatus;
  }): Promise<{ total: number }> {
    const where: FindOptionsWhere<HomeworkSubmission> = {};

    if (filter.studentId !== undefined) {
      where.studentId = filter.studentId;
    }
    if (filter.status !== undefined) {
      where.status = filter.status;
    }
    if (filter.checkedStatus !== undefined) {
      where.checkedStatus = filter.checkedStatus;
    }

    const total = await this.submissionRepo.count({ where });
    return { total };
  }
}
