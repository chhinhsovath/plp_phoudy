import { Status } from '../../../entities/enums/status.enum';
import { SubjectType } from '../../../entities/subject.entity';
export declare class CreateSubjectDto {
    name: string;
    khmer_name?: string;
    description?: string;
    status?: Status;
    is_student?: boolean;
    path?: string;
    subject_type?: SubjectType;
    gradeLevels?: number[];
}
