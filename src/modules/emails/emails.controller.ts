import { HttpService } from '@nestjs/axios';
import { Controller } from '@nestjs/common';
import { Post, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import twilio from 'twilio';
import { EmailsService } from './emails.service';

const accountSid = 'ACbbe97d78bdfa9303523c55fa2ab0b700';
const authToken = 'fa4b6ca8ff862ff90a7445c5fdcf6355';
const client = twilio(accountSid, authToken);

@Controller('emails')
export class EmailsController {
  constructor(private emailsService: EmailsService, private readonly httpService: HttpService) {}
  @Post()
  async sendTemporaryAccessDeal() {
    return {
      abd: await this.emailsService.sendTemporaryAccessDeal('abc', 'ltlong2311@gmail.com'),
      abd2: await this.emailsService.sendTemporaryAccessDeal('abc', 'Trungvu1706@gmail.com'),
    };
  }
  @Post('/phone')
  sendSms() {
    return client.messages
      .create({ body: 'Hello brave nha', from: '+19205451426', to: '+84866081099' })
      .then((message) => {
        console.log(message);
      });
  }
}
