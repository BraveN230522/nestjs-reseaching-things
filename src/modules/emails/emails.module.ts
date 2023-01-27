import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { SMTP_PASSWORD, SMTP_PORT, SMTP_SERVER, SMTP_USER } from '../../environments';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        return {
          transport: {
            host: SMTP_SERVER,
            port: SMTP_PORT,
            secure: false,
            ignoreTLS: false,
            requireTLS: true,
            auth: {
              user: SMTP_USER,
              pass: SMTP_PASSWORD,
            },
            pool: true,
          },
          defaults: {
            from: SMTP_USER,
            replyTo: SMTP_USER,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [EmailsService],
  controllers: [EmailsController],
  exports: [EmailsService],
})
export class EmailsModule {}
