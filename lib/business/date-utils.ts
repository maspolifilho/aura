const MS_PER_HOUR = 1000 * 60 * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

export function diffInHours(later: Date, earlier: Date): number {
  return (later.getTime() - earlier.getTime()) / MS_PER_HOUR;
}

export function diffInDays(later: Date, earlier: Date): number {
  return (later.getTime() - earlier.getTime()) / MS_PER_DAY;
}
