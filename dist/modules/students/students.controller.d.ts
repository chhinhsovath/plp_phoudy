import { StudentsService } from './students.service';
import { StudentDto } from './dto/student.dto';
import { QuestionStatisticsDTO } from './dto/question-statistics.dto';
export declare class StudentsController {
    private readonly studentsService;
    private readonly logger;
    constructor(studentsService: StudentsService);
    findMyStudents(req: any): Promise<StudentDto[]>;
    findOne(id: string): Promise<StudentDto>;
    getQuestionsStatistics(grade?: string, subjectId?: number, lessonTitle?: string, lessonNumber?: number): Promise<QuestionStatisticsDTO[]>;
}
