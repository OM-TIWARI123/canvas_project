import {
  format,
  differenceInMilliseconds,
  subMilliseconds,
} from '@repo/utils/utils/date';

export function toDateString(date: Date) {
  return date.toISOString().split('T')[0];
}

export function formatDate(date: Date) {
  const dayOfMonth = date.getDate();
  const ordinal =
    dayOfMonth % 10 === 1 && dayOfMonth !== 11
      ? 'st'
      : dayOfMonth % 10 === 2 && dayOfMonth !== 12
        ? 'nd'
        : dayOfMonth % 10 === 3 && dayOfMonth !== 13
          ? 'rd'
          : 'th';

  return `${dayOfMonth}${ordinal} ${format(date, 'MMM yyyy')}`;
}

export function getPreviousPeriod(currentFrom: Date, currentTo: Date) {
  const interval = differenceInMilliseconds(currentTo, currentFrom);

  const previousTo = subMilliseconds(currentFrom, 1);

  const previousFrom = subMilliseconds(previousTo, interval);

  return { from: previousFrom, to: previousTo };
}

export function calculateDaysUntil(timestamp?: number) {
  if (!timestamp) return null;
  return Math.round(
    (new Date(timestamp * 1000).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
}
