import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResponse } from '../../entities/user-response.entity';
import { UserResponsesController } from './user-responses.controller';
import { UserResponsesService } from './user-responses.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserResponse])],
  controllers: [UserResponsesController],
  providers: [UserResponsesService],
  exports: [UserResponsesService],
})
export class UserResponsesModule {}
