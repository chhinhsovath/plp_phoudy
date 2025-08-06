import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { MenuItem } from '../../entities/menu-item.entity';
import { UserMenuPermission } from '../../entities/user-menu-permission.entity';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuItem, UserMenuPermission, User, Role]),
  ],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}
