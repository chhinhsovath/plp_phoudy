import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserResidence } from '../../entities/user-residence.entity';
import { UserPob } from '../../entities/user-pob.entity';
import { Province } from '../../entities/province.entity';
import { District } from '../../entities/district.entity';
import { Commune } from '../../entities/commune.entity';
import { Village } from '../../entities/village.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Teacher } from '../../entities/teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserResidence,
      UserPob,
      Teacher,
      Province,
      District,
      Commune,
      Village,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
