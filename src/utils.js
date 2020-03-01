// @flow

import type {
  CreateDayData,
  DateIsBeforeFirstDateInMonth,
  DateIsAfterLastDateInMonth,
  DayData,
  GetFirstDateOfWeek,
  GetWeekData,
  GetNextDay,
  GetFirstDateInMonth,
  GetLastDateInMonth,
  GetMonthData,
  WeekData
} from "./types";

export const oneDayInMilliseconds = 60 * 60 * 24 * 1000;

export const getFirstDateOfWeek: GetFirstDateOfWeek = ({ date }) => {
  const dayOfDate = date.getDay();
  return new Date(date.getTime() - dayOfDate * oneDayInMilliseconds);
};

export const dateIsBeforeFirstDateInMonth: DateIsBeforeFirstDateInMonth = ({
  currentDate,
  firstDateInMonth
}) => {
  return currentDate < firstDateInMonth;
};

export const dateIsAfterLastDateInMonth: DateIsAfterLastDateInMonth = ({
  currentDate,
  lastDateInMonth
}) => {
  return currentDate > lastDateInMonth;
};

export const createDayData: CreateDayData = ({
  currentDate,
  firstDateInMonth,
  lastDateInMonth
}) => {
  const currentDateOutsideMonth =
    dateIsBeforeFirstDateInMonth({ currentDate, firstDateInMonth }) ||
    dateIsAfterLastDateInMonth({ currentDate, lastDateInMonth });

  const dayData: DayData = {
    dayOfMonth: currentDate.getDate(),
    isInCurrentMonth: !currentDateOutsideMonth,
    available: true,
    selected: false,
    today: false,
    date: currentDate
  };

  return dayData;
};

export const getWeekData: GetWeekData = ({
  date,
  firstDateInMonth,
  lastDateInMonth
}) => {
  const firstDateInWeek = getFirstDateOfWeek({ date });

  const week = {};

  let currentDate = firstDateInWeek;
  for (let i = 0; i < 7; i++) {
    const dayData = createDayData({
      currentDate,
      firstDateInMonth,
      lastDateInMonth
    });

    const day = dayData.date.getDay();
    week[day] = dayData;
    currentDate = getNextDay({ date: currentDate });
  }

  return week;
};

export const getNextDay: GetNextDay = ({ date }) => {
  return new Date(date.getTime() + oneDayInMilliseconds);
};

export const getFirstDateInMonth: GetFirstDateInMonth = ({ date }) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDateInMonth: GetLastDateInMonth = ({ date }) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getMonthData: GetMonthData = ({ date }) => {
  const firstDateInMonth = getFirstDateInMonth({ date });
  const lastDateInMonth = getLastDateInMonth({ date });

  const weeksInMonth: WeekData[] = [];

  let nextDate = firstDateInMonth;
  do {
    let currentWeek = getWeekData({
      date: nextDate,
      firstDateInMonth,
      lastDateInMonth
    });
    weeksInMonth.push(currentWeek);

    let lastDateOfCurrentWeek = currentWeek[6].date;
    nextDate = getNextDay({ date: lastDateOfCurrentWeek });
  } while (nextDate < lastDateInMonth);

  return weeksInMonth;
};
