import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { DatesService } from './../dates/dates.service';

@Module({
  providers: [LoggerService, DatesService],
})
export class LoggerModule {}
