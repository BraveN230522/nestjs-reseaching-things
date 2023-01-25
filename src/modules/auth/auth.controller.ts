import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
// import { AdminGuard } from '@nestjs/passport';
import { Admin } from '../entities/admin.entity';
import { User } from '../entities/users.entity';
import { AuthService } from './auth.service';
import { AdminCredentialsDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private adminService: AuthService) {}

  @Post('/login-admin')
  loginAdmin(@Body() adminCredentialsDto: AdminCredentialsDto): Promise<Admin> {
    return this.adminService.loginAdmin(adminCredentialsDto);
  }

  @Post('/login-user')
  @UseInterceptors(ClassSerializerInterceptor)
  loginUser(
    @Body(new ValidationPipe({ transform: true })) adminCredentialsDto: AdminCredentialsDto,
  ): Promise<User> {
    return this.adminService.loginUser(adminCredentialsDto);
  }
}
