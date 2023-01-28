import { HttpService } from '@nestjs/axios';
import { Controller } from '@nestjs/common';
import { Post, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {
  constructor(private emailsService: EmailsService, private readonly httpService: HttpService) {}
  @Post()
  sendTemporaryAccessDeal() {
    return this.emailsService.sendTemporaryAccessDeal('abc', 'woodyntd@gmail.com');
  }
}
