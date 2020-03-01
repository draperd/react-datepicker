// @flow

import type {
  CreateDayData,
  GetEmptyWeek,
  GetFirstDateOfWeek,
  GetWeekData,
  GetNextDay,
  GetFirstDateInMonth,
  GetLastDateInMonth,
  GetMonthData,
  WeekData
} from "./types";

const SUNDAY = "sunday";
const MONDAY = "monday";
const TUESDAY = "tuesday";
const WEDNESDAY = "wednesday";
const THURSDAY = "thursday";
const FRIDAY = "friday";
const SATURDAY = "saturday";
const weekMap = {
  "0": SUNDAY,
  "1": MONDAY,
  "2": TUESDAY,
  "3": WEDNESDAY,
  "4": THURSDAY,
  "5": FRIDAY,
  "6": SATURDAY
};

export const oneDayInMilliseconds = 60 * 60 * 24 * 1000;

export const createDayData: CreateDayData = ({
  dayOfMonth,
  isInCurrentMonth = false,
  available = true,
  selected = false,
  today = false,
  date = new Date()
}) => {
  return {
    dayOfMonth,
    isInCurrentMonth,
    available,
    selected,
    today,
    date
  };
};

export const getEmptyWeek: GetEmptyWeek = () => {
  return {
    [SUNDAY]: createDayData({ dayOfMonth: 1 }),
    [MONDAY]: createDayData({ dayOfMonth: 2 }),
    [TUESDAY]: createDayData({ dayOfMonth: 3 }),
    [WEDNESDAY]: createDayData({ dayOfMonth: 4 }),
    [THURSDAY]: createDayData({ dayOfMonth: 5 }),
    [FRIDAY]: createDayData({ dayOfMonth: 6 }),
    [SATURDAY]: createDayData({ dayOfMonth: 7 })
  };
};

export const getFirstDateOfWeek: GetFirstDateOfWeek = ({ date }) => {
  const dayOfDate = date.getDay();
  return new Date(date.getTime() - dayOfDate * oneDayInMilliseconds);
};

export const getWeekData: GetWeekData = ({
  date,
  firstDateInMonth,
  lastDateInMonth
}) => {
  debugger;
  const firstDateInWeek = getFirstDateOfWeek({ date });
  const week = getEmptyWeek();

  let currentDate = firstDateInWeek;
  for (let i = 0; i < 7; i++) {
    if (currentDate < firstDateInMonth) {
      // Date is in previous month...
      let dayData = createDayData({
        dayOfMonth: currentDate.getDate(),
        isInCurrentMonth: false,
        available: true,
        selected: false,
        today: false,
        date: currentDate
      });

      const day = weekMap[currentDate.getDay()];
      week[day] = dayData;
    } else if (currentDate > lastDateInMonth) {
      // Date is in next month...
      let dayData = createDayData({
        dayOfMonth: currentDate.getDate(),
        isInCurrentMonth: false,
        available: true,
        selected: false,
        today: false,
        date: currentDate
      });
      const day = weekMap[currentDate.getDay()];
      week[day] = dayData;
    } else {
      // Date is in this month...
      let dayData = createDayData({
        dayOfMonth: currentDate.getDate(),
        isInCurrentMonth: true,
        available: true,
        selected: false,
        today: false,
        date: currentDate
      });
      const day = weekMap[currentDate.getDay()];
      week[day] = dayData;
    }
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

  debugger;
  let nextDate = firstDateInMonth;
  do {
    let currentWeek = getWeekData({
      date: nextDate,
      firstDateInMonth,
      lastDateInMonth
    });
    weeksInMonth.push(currentWeek);

    let lastDateOfCurrentWeek = currentWeek.saturday.date;
    nextDate = getNextDay({ date: lastDateOfCurrentWeek });
  } while (nextDate < lastDateInMonth);

  return weeksInMonth;
};
