import moment from 'moment';
import { basename, dirname, extname } from 'path';

export function addTimeToDate(
  date: Date,
  amount: moment.DurationInputArg1,
  unit: moment.DurationInputArg2 = 'm',
): Date {
  return moment(date).add(amount, unit).toDate();
}

export function extractPath(path: string) {
  return {
    dirname: dirname(path),
    basename: basename(path),
    extension: extname(path),
  };
}
