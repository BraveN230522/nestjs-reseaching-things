import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHelper } from '../../helpers';
import { assignIfHasKey } from '../../utilities';
import { Admin } from '../entities/admin.entity';
import { AdminRepository } from './admin.repository';
import { UpdateAdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(AdminRepository) private adminRepository: AdminRepository) {}

  async getAdmin(id): Promise<Admin> {
    const found = await this.adminRepository.findOneBy({ id });

    if (!found) ErrorHelper.NotFoundException(`User ${id} is not found`);

    return found;
  }

  async createAdmin({ username }): Promise<Admin> {
    return await this.adminRepository.findOneBy({ username });
  }

  async getAdminByUsername({ username }): Promise<Admin> {
    return await this.adminRepository.findOneBy({ username });
  }

  async updateAdmin(id, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.getAdmin(id);
    assignIfHasKey(admin, updateAdminDto);

    await this.adminRepository.save([admin]);

    return admin;
  }
}
