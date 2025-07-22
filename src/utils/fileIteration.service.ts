import { Injectable } from '@nestjs/common';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class FileIterationService {
  constructor(private readonly log: LoggerService) {}
  tempDirectory = tmpdir();

  async saveFile(
    reqId: string,
    fileBuffer: Buffer,
    fileName: string,
  ): Promise<string> {
    // save file buffer to temp strorage
    try {
      this.log.setLog('info', reqId, FileIterationService.name, 'saveFile', {
        fileName,
      });
      // generate path to store file
      const filePath = join(this.tempDirectory, `${fileName}.jpg`);

      this.log.setLog('info', reqId, FileIterationService.name, 'saveFile', {
        filePath,
      });
      await writeFile(filePath, fileBuffer);

      return filePath;
    } catch (err) {
      this.log.setLog('error', reqId, FileIterationService.name, 'saveFile', {
        error: err.message,
      });
      return '';
    }
  }

  async deleteFile(reqId: string, filePath: string): Promise<boolean> {
    try {
      this.log.setLog('info', reqId, FileIterationService.name, 'deleteFile', {
        filePath,
      });
      await unlink(filePath);
      return true;
    } catch (err) {
      this.log.setLog('error', reqId, FileIterationService.name, 'deleteFile', {
        error: err.message,
      });
      return false;
    }
  }
}
