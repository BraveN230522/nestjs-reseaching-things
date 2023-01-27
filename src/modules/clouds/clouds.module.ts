import { Module } from '@nestjs/common';
import { HttpModule } from '../../common/http/http.module';
import { CloudsController } from './clouds.controller';
import { CloudsService } from './clouds.service';

@Module({
  imports: [HttpModule],
  providers: [CloudsService],
  controllers: [CloudsController],
})
export class CloudsModule {}
