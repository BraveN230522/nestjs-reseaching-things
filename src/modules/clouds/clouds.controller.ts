import {
  Controller
} from '@nestjs/common';
import { CloudsService } from './clouds.service';

@Controller('auth')
export class CloudsController {
  constructor(private adminService: CloudsService) {}
  
}