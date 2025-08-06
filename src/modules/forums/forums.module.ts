import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumsController } from './forums.controller';
import { ForumsService } from './forums.service';
import { Forum } from '../../entities/forum.entity';
import { Subject } from '../../entities/subject.entity';
import { ForumSave } from 'src/entities/forum-save.entity';
import { ForumLike } from 'src/entities/forum-like.entity';
import { ForumComment } from 'src/entities/forum-comment.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Student } from 'src/entities/student.entity';
import { Class } from 'src/entities/class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Forum,
      Subject,
      ForumSave,
      ForumLike,
      ForumComment,
      Teacher,
      Student,
      Class,
    ]),
  ],
  controllers: [ForumsController],
  providers: [ForumsService],
  exports: [ForumsService],
})
export class ForumsModule {}
