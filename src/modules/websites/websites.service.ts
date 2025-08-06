import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from '../../entities/website.entity';
import { WebsiteRolePermission } from '../../entities/website-role-permission.entity';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { PaginationResult } from '../../common/pagination.interface';

@Injectable()
export class WebsitesService {
  constructor(
    @InjectRepository(Website)
    private websiteRepository: Repository<Website>,
    @InjectRepository(WebsiteRolePermission)
    private websiteRolePermissionRepository: Repository<WebsiteRolePermission>,
  ) {}

  async create(createWebsiteDto: CreateWebsiteDto): Promise<Website> {
    const existingWebsite = await this.websiteRepository.findOne({
      where: [
        { name: createWebsiteDto.name },
        { domain: createWebsiteDto.domain },
      ],
    });

    if (existingWebsite) {
      throw new ConflictException('Website name or domain already exists');
    }

    const website = this.websiteRepository.create(createWebsiteDto);
    return this.websiteRepository.save(website);
  }

  async findAll(
    limit?: number,
    offset?: number,
  ): Promise<PaginationResult<Website>> {
    const take = limit || 10;
    const skip = offset || 0;

    const [websites, total] = await this.websiteRepository.findAndCount({
      take,
      skip,
      order: { created_at: 'DESC' },
    });

    return {
      data: websites,
      total,
      limit: take,
      page: Math.floor(skip / take) + 1,
      totalPages: Math.ceil(total / take),
    };
  }

  async findOne(id: number): Promise<Website> {
    const website = await this.websiteRepository.findOne({ where: { id } });
    if (!website) {
      throw new NotFoundException(`Website with ID ${id} not found`);
    }
    return website;
  }

  async update(
    id: number,
    updateWebsiteDto: UpdateWebsiteDto,
  ): Promise<Website> {
    const website = await this.findOne(id);

    if (updateWebsiteDto.name && updateWebsiteDto.name !== website.name) {
      const existingName = await this.websiteRepository.findOne({
        where: { name: updateWebsiteDto.name },
      });
      if (existingName) {
        throw new ConflictException('Website name already exists');
      }
    }

    if (updateWebsiteDto.domain && updateWebsiteDto.domain !== website.domain) {
      const existingDomain = await this.websiteRepository.findOne({
        where: { domain: updateWebsiteDto.domain },
      });
      if (existingDomain) {
        throw new ConflictException('Website domain already exists');
      }
    }

    Object.assign(website, updateWebsiteDto);
    return this.websiteRepository.save(website);
  }

  async remove(id: number): Promise<void> {
    const website = await this.findOne(id);
    await this.websiteRepository.remove(website);
  }

  async activate(id: number): Promise<Website> {
    const website = await this.findOne(id);
    website.is_active = true;
    return this.websiteRepository.save(website);
  }

  async deactivate(id: number): Promise<Website> {
    const website = await this.findOne(id);
    website.is_active = false;
    return this.websiteRepository.save(website);
  }

  async assignRolePermission(websiteId: number, roleId: number): Promise<void> {
    const existing = await this.websiteRolePermissionRepository.findOne({
      where: { website_id: websiteId, role_id: roleId },
    });

    if (existing) {
      throw new ConflictException(
        'Role permission already exists for this website',
      );
    }

    const permission = this.websiteRolePermissionRepository.create({
      website_id: websiteId,
      role_id: roleId,
    });

    await this.websiteRolePermissionRepository.save(permission);
  }

  async removeRolePermission(websiteId: number, roleId: number): Promise<void> {
    const permission = await this.websiteRolePermissionRepository.findOne({
      where: { website_id: websiteId, role_id: roleId },
    });

    if (!permission) {
      throw new NotFoundException('Role permission not found');
    }

    await this.websiteRolePermissionRepository.remove(permission);
  }

  async getWebsitePermissions(
    websiteId: number,
  ): Promise<WebsiteRolePermission[]> {
    return this.websiteRolePermissionRepository.find({
      where: { website_id: websiteId },
      relations: ['role'],
    });
  }
}
