import { Module } from '@nestjs/common';
import { CloudsController } from './clouds.controller';
import { CloudsService } from './clouds.service';

@Module({
  providers: [CloudsService],
  controllers: [CloudsController],
})
export class CloudsModule {}
