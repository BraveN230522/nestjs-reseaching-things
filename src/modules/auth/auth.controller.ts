import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from '../../common';
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

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    console.log(HttpStatus.OK);
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@UserDecorator() user): Promise<any> {
    console.log({
      statusCode: HttpStatus.OK,
      data: user,
    });
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }
}
