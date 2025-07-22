import { format, differenceInDays, parse, add, getUnixTime } from 'date-fns';
export class DatesService {
  getDateTime(date = new Date(), formatType = 'yyyy-MM-dd HH:mm:ss:SSS z') {
    return format(date, formatType);
  }

  getDateDiff(dateTill: Date, dateFrom: Date, diffType: string) {
    switch (diffType) {
      case 'days':
        return differenceInDays(dateTill, dateFrom);
      default:
        return 1;
    }
  }

  addDate(date: Date, formatType: object): Date {
    return add(date, formatType);
  }

  parseDate(date: string, formatType: string): Date {
    return parse(date, formatType, new Date());
  }

  formatDate(date: Date, formatType: string): string {
    return format(date, formatType);
  }

  unixDate(date: Date): number {
    return getUnixTime(date);
  }

  getEpochDate(date = new Date()) {
    return getUnixTime(date);
  }
}
