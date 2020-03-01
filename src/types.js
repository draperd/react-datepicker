// @flow

export type DayData = {
  dayOfMonth: number,
  isInCurrentMonth: boolean,
  available: boolean,
  selected: boolean,
  today: boolean,
  date: Date
};

export type WeekData = {
  sunday: DayData,
  monday: DayData,
  tuesday: DayData,
  wednesday: DayData,
  thursday: DayData,
  friday: DayData,
  saturday: DayData
};

export type CreateDayData = ({
  dayOfMonth: number,
  isInCurrentMonth?: boolean,
  available?: boolean,
  selected?: boolean,
  today?: boolean,
  date?: Date
}) => DayData;

export type GetFirstDayOfMonth = Date => number;
export type GetLastDateOfPreviousMonth = Date => number;
export type GetEmptyWeek = () => WeekData;

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
