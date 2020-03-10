// @flow

export type DayData = {
  dayOfMonth: number,
  isInCurrentMonth: boolean,
  available: boolean,
  selected: boolean,
  today: boolean,
  date: Date
};

export type Props = {
  day: DayData
};
