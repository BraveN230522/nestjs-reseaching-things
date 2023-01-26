import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { Role } from '../../enums';
import { ErrorHelper } from '../../helpers';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../entities/admin.entity';
import { User } from '../entities/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CloudsService {
  constructor(
    private adminService: AdminService,
  ) {}
}
