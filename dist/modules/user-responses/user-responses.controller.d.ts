import { UserResponsesService } from './user-responses.service';
import { UserResponseDto, CreateUserResponseDto, UpdateUserResponseDto, BulkDeleteDto } from './dto/user-response.dto';
export declare class UserResponsesController {
    private readonly userResponsesService;
    private readonly logger;
    constructor(userResponsesService: UserResponsesService);
    findAll(): Promise<UserResponseDto[]>;
    findOne(id: number): Promise<UserResponseDto>;
    findByQuestionId(questionId: number): Promise<UserResponseDto[]>;
    findCorrectByQuestionId(questionId: number): Promise<UserResponseDto[]>;
    findFastestByQuestionId(questionId: number): Promise<UserResponseDto[]>;
    findHighestImpactByQuestionId(questionId: number): Promise<UserResponseDto[]>;
    findByUserId(userId: number): Promise<UserResponseDto[]>;
    create(createUserResponseDto: CreateUserResponseDto): Promise<UserResponseDto>;
    update(id: number, updateUserResponseDto: UpdateUserResponseDto): Promise<UserResponseDto>;
    remove(id: number): Promise<void>;
    bulkDelete(bulkDeleteDto: BulkDeleteDto): Promise<void>;
}
