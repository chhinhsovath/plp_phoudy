import { Status } from '../../../entities/enums/status.enum';
import { SchoolPlaceDto } from './school-place.dto';
export declare class CreateSchoolDto {
    name: string;
    code: string;
    place?: SchoolPlaceDto;
    profile?: string;
    status?: Status;
}
