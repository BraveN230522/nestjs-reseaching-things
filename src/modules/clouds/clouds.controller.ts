import { Controller } from '@nestjs/common';
import { Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';
import { imgbox } from 'imgbox-js';
import { diskStorage } from 'multer';
import { editFileName } from '../../helpers/multer.helper';
import { CloudsService } from './clouds.service';

@Controller('clouds')
export class CloudsController {
  constructor(private cloudsService: CloudsService) {}
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
  uploadArrayFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const response = [];
    files.forEach((file) => {
      console.log(file);
      const fileResponse = {
        filename: file.filename,
      };
      response.push(fileResponse);
    });
    imgbox('D:/Downloads/B26 detail.jpg').then((res) => console.log(res));
    return response;
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
