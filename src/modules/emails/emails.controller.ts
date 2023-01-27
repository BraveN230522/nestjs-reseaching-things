import { HttpService } from '@nestjs/axios';
import { Controller } from '@nestjs/common';
import { Post, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {
  constructor(private emailsService: EmailsService, private readonly httpService: HttpService) {}
  @Post()
  sendTemporaryAccessDeal() {
    this.emailsService.sendTemporaryAccessDeal('abc', 'thanhhaluong2611@gmail.com');
  }
}
