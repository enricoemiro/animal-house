import moment from 'moment';

export function addTimeToDate(
  date: Date,
  amount: moment.DurationInputArg1,
  unit: moment.DurationInputArg2 = 'm',
): Date {
  return moment(date).add(amount, unit).toDate();
}
