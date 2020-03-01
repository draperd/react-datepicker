// @flow

export type DateIsBeforeFirstDateInMonth = ({
  currentDate: Date,
  firstDateInMonth: Date
}) => boolean;

export type DateIsAfterLastDateInMonth = ({
  currentDate: Date,
  lastDateInMonth: Date
}) => boolean;

export type DayData = {
  dayOfMonth: number,
  isInCurrentMonth: boolean,
  available: boolean,
  selected: boolean,
  today: boolean,
  date: Date
};

export type CreateDayData = ({
  currentDate: Date,
  firstDateInMonth: Date,
  lastDateInMonth: Date
}) => DayData;

export type WeekData = {
  [number]: DayData
};

export type GetFirstDayOfMonth = Date => number;
export type GetLastDateOfPreviousMonth = Date => number;

export type GetWeekData = ({
  date: Date,
  firstDateInMonth: Date,
  lastDateInMonth: Date
}) => WeekData;

export type GetFirstDateOfWeek = ({ date: Date }) => Date;

export type GetFirstDateInMonth = ({ date: Date }) => Date;
export type GetLastDateInMonth = ({ date: Date }) => Date;
export type GetNextDay = ({ date: Date }) => Date;

export type GetMonthData = ({ date: Date }) => WeekData[];
