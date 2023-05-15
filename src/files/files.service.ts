import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async createFile(
    file,
    info: { downloadHref: string; imageId: string; fileName: string },
  ) {
    try {
      const fileName =
        info.imageId + '.' + info.fileName.split('.').reverse()[0];
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFile(path.join(filePath, fileName), file, function (err) {
        err ? console.log(err) : console.log(`File saved to ${filePath}`);
      });

      return fileName;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
