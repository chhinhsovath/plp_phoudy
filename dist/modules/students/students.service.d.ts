import { Repository } from 'typeorm';
import { Question } from '../../entities/question.entity';
import { Student } from '../../entities/student.entity';
import { Teacher } from '../../entities/teacher.entity';
import { UserResponse } from '../../entities/user-response.entity';
import { QuestionStatisticsDTO } from './dto/question-statistics.dto';
import { StudentDto } from './dto/student.dto';
export declare class StudentsService {
    private studentRepository;
    private teacherRepository;
    private userResponseRepository;
    private questionRepository;
    private readonly logger;
    constructor(studentRepository: Repository<Student>, teacherRepository: Repository<Teacher>, userResponseRepository: Repository<UserResponse>, questionRepository: Repository<Question>);
    private getTeacherIdByUserId;
    private calculateStudentStats;
    findByTeacherUserId(userId: number): Promise<StudentDto[]>;
    findOne(id: number): Promise<StudentDto>;
    getQuestionsStatistics(grade?: string, subjectId?: number, lessonTitle?: string, lessonNumber?: number): Promise<QuestionStatisticsDTO[]>;
}
