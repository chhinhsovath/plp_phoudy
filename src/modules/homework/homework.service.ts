import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Homework } from 'src/entities/homework.entity';
import { Repository, LessThan, MoreThanOrEqual } from 'typeorm';
import { CreateHomeworkDto } from './dto/homework.dto';
import { SearchHomeworkDto } from './dto/searchHomework.dto';
import { SubmissionFile } from 'src/entities/submission-files.entity';

type HomeworkWithSubmission = Homework & {
  submitted: boolean;
  submittedAt: Date | null;
};

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Homework)
    private readonly homeworkRepo: Repository<Homework>,
    @InjectRepository(SubmissionFile)
    private readonly submissionFileRepo: Repository<SubmissionFile>,
  ) {}

  async create(data: CreateHomeworkDto): Promise<Homework> {
    console.log('Creating homework with data:', data);
    // Extract homeworkFiles from DTO if present
    const { homeworkFiles, ...homeworkData } = data;
    const homework = this.homeworkRepo.create({
      ...homeworkData,
      allowResubmit: data.allowResubmit ?? false,
    });
    const savedHomework = await this.homeworkRepo.save(homework);

    // Save homework files if provided
    if (homeworkFiles && homeworkFiles.length > 0) {
      const fileEntities = homeworkFiles.map((file) =>
        this.submissionFileRepo.create({
          ...file,
          homework: savedHomework,
        }),
      );
      await this.submissionFileRepo.save(fileEntities);
    }
    return savedHomework;
  }

  async findAll(): Promise<HomeworkWithSubmission[]> {
    // Get all homeworks
    const homeworks = await this.homeworkRepo.find();
    // For each homework, attach homeworkFiles
    for (const hw of homeworks) {
      const files = await this.submissionFileRepo.find({
        where: { homework: { id: hw.id } },
      });
      (hw as any).homeworkFiles = files;
    }
    return (await this.search({ limit: 1000 })).data;
  }

  async findOne(id: number): Promise<Homework> {
    if (isNaN(id)) {
      throw new NotFoundException('Invalid homework ID');
    }

    const homework = await this.homeworkRepo.findOne({
      where: { id },
      relations: [
        'submissions',
        'submissions.submissionFiles',
        'submissions.checkedByTeacher',
        'submissions.student',
        'submissions.student.user',
      ],
    });

    if (!homework) throw new NotFoundException('Homework not found');
    // Attach homeworkFiles
    const files = await this.submissionFileRepo.find({
      where: { homework: { id } },
    });
    (homework as any).homeworkFiles = files;
    return homework;
  }

  async update(id: number, data: CreateHomeworkDto): Promise<Homework> {
    const homework = await this.findOne(id);
    const { homeworkFiles, filesToDelete, ...updateData } = data;
    Object.assign(homework, updateData);
    if (data.allowResubmit !== undefined) {
      homework.allowResubmit = data.allowResubmit;
    }
    const updatedHomework = await this.homeworkRepo.save(homework);

    // Delete files if filesToDelete is provided
    if (filesToDelete && filesToDelete.length > 0) {
      // Filter out any non-numeric values and parse strings to numbers
      const validIds = filesToDelete
        .map((id) => (typeof id === 'string' ? parseInt(id, 10) : id))
        .filter((id) => !isNaN(id));
      if (validIds.length > 0) {
        await this.submissionFileRepo.delete(validIds);
      }
    }

    // Add new files if homeworkFiles is provided
    if (homeworkFiles && homeworkFiles.length > 0) {
      const fileEntities = homeworkFiles.map((file) =>
        this.submissionFileRepo.create({
          ...file,
          homework: updatedHomework,
        }),
      );
      await this.submissionFileRepo.save(fileEntities);
    }

    return updatedHomework;
  }

  async findByTeacherId(teacherId: number): Promise<Homework[]> {
    const homeworks = await this.homeworkRepo.find({
      where: { teacherId },
      relations: ['submissions'],
    });
    for (const hw of homeworks) {
      const files = await this.submissionFileRepo.find({
        where: { homework: { id: hw.id } },
      });
      (hw as any).homeworkFiles = files;
    }
    return homeworks;
  }

  async findByClassId(classId: number): Promise<Homework[]> {
    const homeworks = await this.homeworkRepo.find({
      where: { classId },
      relations: ['submissions'],
    });
    for (const hw of homeworks) {
      const files = await this.submissionFileRepo.find({
        where: { homework: { id: hw.id } },
      });
      (hw as any).homeworkFiles = files;
    }
    return homeworks;
  }

  async findBySubjectId(subjectId: number): Promise<Homework[]> {
    const homeworks = await this.homeworkRepo.find({
      where: { subjectId },
      relations: ['submissions'],
    });
    for (const hw of homeworks) {
      const files = await this.submissionFileRepo.find({
        where: { homework: { id: hw.id } },
      });
      (hw as any).homeworkFiles = files;
    }
    return homeworks;
  }

  async findByLessonId(lessonId: number): Promise<Homework[]> {
    const homeworks = await this.homeworkRepo.find({
      where: { lessonId },
      relations: ['submissions'],
    });
    for (const hw of homeworks) {
      const files = await this.submissionFileRepo.find({
        where: { homework: { id: hw.id } },
      });
      (hw as any).homeworkFiles = files;
    }
    return homeworks;
  }
  async search(filter: SearchHomeworkDto): Promise<{
    data: HomeworkWithSubmission[];
    totalItems: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const {
      query,
      page = 1,
      limit = 5,
      teacherId,
      classId,
      subjectId,
      lessonId,
      status,
      overdue,
      studentId,
      hasSubmission,
      createdFrom,
      createdTo,
      dueFrom,
      dueTo,
      submittedFrom,
      submittedTo,
    } = filter;

    // Build the main query for homeworks
    const qb = this.homeworkRepo
      .createQueryBuilder('homework')
      .leftJoinAndSelect('homework.submissions', 'submission')
      .leftJoinAndSelect('submission.submissionFiles', 'file')
      .leftJoinAndSelect('submission.checkedByTeacher', 'checkedBy')
      .leftJoinAndSelect('submission.student', 'student')
      .leftJoinAndSelect('student.user', 'studentUser');

    // Search by title or description
    if (query) {
      qb.andWhere(
        '(homework.title ILIKE :q OR homework.description ILIKE :q)',
        {
          q: `%${query}%`,
        },
      );
    }

    // Filters
    if (teacherId)
      qb.andWhere('homework.teacherId = :teacherId', { teacherId });
    if (classId) qb.andWhere('homework.classId = :classId', { classId });
    if (subjectId)
      qb.andWhere('homework.subjectId = :subjectId', { subjectId });
    if (lessonId) qb.andWhere('homework.lessonId = :lessonId', { lessonId });
    if (status) qb.andWhere('homework.status = :status', { status });

    // Date range filters
    if (createdFrom) {
      qb.andWhere('homework.createdAt >= :createdFrom', {
        createdFrom: new Date(createdFrom),
      });
    }
    if (createdTo) {
      qb.andWhere('homework.createdAt <= :createdTo', {
        createdTo: new Date(createdTo),
      });
    }

    if (dueFrom) {
      qb.andWhere('homework.dueDate >= :dueFrom', {
        dueFrom: new Date(dueFrom),
      });
    }
    if (dueTo) {
      qb.andWhere('homework.dueDate <= :dueTo', {
        dueTo: new Date(dueTo),
      });
    }

    // Overdue filter
    if (overdue !== undefined) {
      const now = new Date();
      if (overdue === 'true') {
        qb.andWhere('homework.dueDate < :now', { now });
      } else {
        qb.andWhere('homework.dueDate >= :now', { now });
      }
    }

    // Handle student-specific filtering
    if (studentId !== undefined) {
      // When studentId is provided, we want to see homeworks that this student has/hasntsubmitted
      if (hasSubmission !== undefined) {
        if (hasSubmission === 'true') {
          // Homeworks that this student HAS submitted
          qb.andWhere('submission.studentId = :studentId', { studentId });
        } else {
          // Homeworks that this student HASN'T submitted
          qb.andWhere(
            'homework.id NOT IN (SELECT hs.homework_id FROM homework_submissions hs WHERE hs.student_id = :studentId)',
            { studentId },
          );
        }
      } else {
        // Just filter by student submissions without hasSubmission filter
        qb.andWhere('submission.studentId = :studentId', { studentId });
      }
    } else {
      // When no studentId is provided, filter by general submission status
      if (hasSubmission !== undefined) {
        if (hasSubmission === 'true') {
          // Homeworks that have ANY submissions
          qb.andWhere('submission.id IS NOT NULL');
        } else {
          // Homeworks that have NO submissions
          qb.andWhere('submission.id IS NULL');
        }
      }
    }

    // Submission date range filters (only apply when we have submissions)
    if (submittedFrom || submittedTo) {
      if (submittedFrom) {
        qb.andWhere('submission.submittedAt >= :submittedFrom', {
          submittedFrom: new Date(submittedFrom),
        });
      }
      if (submittedTo) {
        qb.andWhere('submission.submittedAt <= :submittedTo', {
          submittedTo: new Date(submittedTo),
        });
      }
    }

    // Pagination and ordering
    qb.orderBy('homework.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    // Execute query
    const [results, total] = await qb.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    // Map results to add submitted and submittedAt properties safely
    const dataWithSubmittedFlag: HomeworkWithSubmission[] = await Promise.all(
      results.map(async (homework) => {
        const hw = homework as HomeworkWithSubmission;

        let submission;

        if (studentId !== undefined) {
          // Find submission for the specific student
          submission = hw.submissions?.find((s) => s.studentId === studentId);
        } else {
          // When no specific student, we can't determine if "submitted"
          // since we don't know which student we're checking for
          submission = undefined;
        }

        hw.submitted = !!submission;
        hw.submittedAt = submission?.submittedAt ?? null;

        // Attach homeworkFiles
        const files = await this.submissionFileRepo.find({
          where: { homework: { id: hw.id } },
        });
        (hw as any).homeworkFiles = files;

        return hw;
      }),
    );

    return {
      data: dataWithSubmittedFlag,
      totalItems: total,
      page,
      limit,
      totalPages,
    };
  }

  async getHomeworkCountsActiveByTeacher(teacherId?: number, classId?: number) {
    const now = new Date();

    const baseFilter: any = {};
    if (teacherId !== undefined) {
      baseFilter.teacherId = teacherId;
    }
    if (classId !== undefined) {
      baseFilter.classId = classId;
    }

    const activeBase = { ...baseFilter, status: 'ACTIVE' };

    const total = await this.homeworkRepo.count({ where: activeBase });

    const overdue = await this.homeworkRepo.count({
      where: {
        ...activeBase,
        dueDate: LessThan(now),
      },
    });

    const upcoming = await this.homeworkRepo.count({
      where: {
        ...activeBase,
        dueDate: MoreThanOrEqual(now),
      },
    });

    const draftFilter: any = { status: 'DRAFT' };
    if (teacherId !== undefined) draftFilter.teacherId = teacherId;
    if (classId !== undefined) draftFilter.classId = classId;

    const draft = await this.homeworkRepo.count({ where: draftFilter });

    // 🔥 NEW: Count homeworks with at least one submission (hasSubmission = true)
    const withSubmission = await this.homeworkRepo
      .createQueryBuilder('homework')
      .leftJoin('homework.submissions', 'submission')
      .where('homework.status = :status', { status: 'ACTIVE' })
      .andWhere('submission.id IS NOT NULL')
      .andWhere(
        teacherId !== undefined ? 'homework.teacherId = :teacherId' : '1=1',
        { teacherId },
      )
      .andWhere(classId !== undefined ? 'homework.classId = :classId' : '1=1', {
        classId,
      })
      .getCount();

    return {
      total,
      overdue,
      upcoming,
      draft,
      withSubmission, // 🆕 Return new count
    };
  }

  async softDelete(id: number): Promise<void> {
    const homework = await this.findOne(id);
    homework.status = 'INACTIVE';
    await this.homeworkRepo.save(homework);
  }

  async hardDelete(id: number): Promise<void> {
    const homework = await this.findOne(id);
    await this.homeworkRepo.remove(homework);
  }
}
