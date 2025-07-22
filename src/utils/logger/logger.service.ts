import { Injectable, Logger } from '@nestjs/common';
import { DatesService } from './../dates/dates.service';

@Injectable()
export class LoggerService {
  constructor(private datesService: DatesService) {}

  setLog(
    logType: string,
    reqId: string,
    logName: string,
    functionName: string,
    params: Object,
  ) {
    const dateTime = this.datesService.getDateTime();
    if (logType === 'info')
      Logger.log(
        `${dateTime} | ${reqId} | ${logName} | ${functionName} |  ${JSON.stringify(
        params
        )}`,
      );
    else
      Logger.error(
        `${dateTime} | ${reqId} | ${logName} | ${functionName} | ${JSON.stringify(
          params
        )}`,
      );
  }
}
