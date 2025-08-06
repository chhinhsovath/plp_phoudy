import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsitesService } from './websites.service';
import { WebsitesController } from './websites.controller';
import { Website } from '../../entities/website.entity';
import { WebsiteRolePermission } from '../../entities/website-role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Website, WebsiteRolePermission])],
  controllers: [WebsitesController],
  providers: [WebsitesService],
  exports: [WebsitesService],
})
export class WebsitesModule {}
