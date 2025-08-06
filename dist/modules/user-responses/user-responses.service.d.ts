import { Repository } from 'typeorm';
import { UserResponse } from '../../entities/user-response.entity';
import { CreateUserResponseDto, UpdateUserResponseDto, UserResponseDto } from './dto/user-response.dto';
export declare class UserResponsesService {
    private userResponseRepository;
    private readonly logger;
    constructor(userResponseRepository: Repository<UserResponse>);
    findAll(): Promise<UserResponseDto[]>;
    findById(id: number): Promise<UserResponseDto>;
    findByQuestionId(questionId: number): Promise<UserResponseDto[]>;
    findByQuestionIdAndIsCorrect(questionId: number, isCorrect: boolean): Promise<UserResponseDto[]>;
    findByQuestionIdOrderByTimeSpentAsc(questionId: number): Promise<UserResponseDto[]>;
    findByQuestionIdOrderByScoreImpactDesc(questionId: number): Promise<UserResponseDto[]>;
    findByUserId(userId: number): Promise<UserResponseDto[]>;
    create(createUserResponseDto: CreateUserResponseDto): Promise<UserResponseDto>;
    update(id: number, updateUserResponseDto: UpdateUserResponseDto): Promise<UserResponseDto>;
    remove(id: number): Promise<void>;
    bulkRemove(ids: number[]): Promise<void>;
    private mapToDto;
}
