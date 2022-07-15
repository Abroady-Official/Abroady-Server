import dayjs from 'dayjs';

export const timestamp = (targetDate: Date): string => {
  let diff: number;
  const now = dayjs().add(9, 'h');

  diff = now.diff(dayjs(targetDate), 'h');

  if (diff <= 0) {
    diff = now.diff(dayjs(targetDate), 'm');
    return `${diff}분 전`;
  }
  if (diff < 24 && diff > 0) return `${diff}시간 전`;
  else return `${Math.trunc(diff / 24)}일 전`;
};
