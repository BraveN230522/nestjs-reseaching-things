import { Module } from '@nestjs/common';
import { NestHttpModule } from './common/http/http.module';
import { AppConfigModule } from './configuration';
import { DatabaseModule } from './database';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { CloudsModule } from './modules/clouds/clouds.module';
import { EmailsModule } from './modules/emails/emails.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    AdminModule,
    AuthModule,
    DatabaseModule,
    AppConfigModule,
    CloudsModule,
    NestHttpModule,
    EmailsModule,
  ],
})
export class AppModule {}
