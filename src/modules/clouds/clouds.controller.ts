import { HttpService } from '@nestjs/axios';
import { Controller } from '@nestjs/common';
import { Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';
import FormData from 'form-data';
import { catchError, map } from 'rxjs';
import { ErrorHelper } from '../../helpers';
import { CloudsService } from './clouds.service';

@Controller('clouds')
export class CloudsController {
  constructor(private cloudsService: CloudsService, private readonly httpService: HttpService) {}
  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  //TODO: Need to find path of files
  @Post('upload-array-files')
  @UseInterceptors(
    FilesInterceptor(
      'files',
      // , 20, {
      //   storage: diskStorage({
      //     destination: './uploads/',
      //     filename: editFileName,
      //   }),
      // }
    ),
  )
  async uploadArrayFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const response = [];
    files.forEach((file) => {
      const fileResponse = {
        filename: file.filename,
      };
      response.push(fileResponse);
    });
    const url = Buffer.from(files[0].buffer).toString('base64');

    const fd = new FormData();
    fd.append('image', url);
    fd.append('type', 'base64');
    fd.append('name', files[0].originalname);
    fd.append('title', files[0].originalname);
    fd.append('desc', files[0].originalname);

    return this.httpService
      .post('https://api.imgur.com/3/upload', fd, {
        headers: {
          Authorization: 'Bearer 02d3480eee3fbb8d7a7d898c4156517adf7869b8',
          // Cookie: 'IMGURSESSION=05d714b320e8f1bfe398d91f95c723f1; _nc=1',
        },
      })
      .pipe(map((res) => console.log(res)))
      .pipe(
        catchError((err): any => {
          console.log({ err: err.config.data });
          ErrorHelper.ForbiddenException('API not available');
        }),
      );
  }

  @Post('upload-multiple-files')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  uploadMultipleFiles(
    @UploadedFiles() files: { avatar?: Express.Multer.File[]; background?: Express.Multer.File[] },
  ) {
    console.log(files);
  }
}
