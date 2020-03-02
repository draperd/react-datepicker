// @flow

// import React from "react";
import {
  datesAreEqual,
  getFirstDateInMonth,
  getFirstDateOfWeek,
  getLastDateInMonth,
  getMonthData,
  getNextDay,
  getWeekData
} from "./utils";
// import { act } from "react-dom/test-utils";
// import { mount } from "enzyme";
// import chai, { expect as chaiExpect } from "chai";
// import chaiEnzyme from "chai-enzyme";

// chai.use(chaiEnzyme());

describe("datesAreEqual", () => {
  const date1 = new Date("2020-03-04");
  const date2 = new Date("2018-02-15");
  it("should return true when dates are equal", () => {
    expect(datesAreEqual({ date1, date2: date1 })).toBe(true);
  });

  it("should return false when dates are NOT equal", () => {
    expect(datesAreEqual({ date1, date2 })).toBe(false);
  });
});

describe("getFirstDateOfWeek", () => {
  it("should return correct date for Feb 2020", () => {
    const date = new Date("2020-02-15");
    const firstDateOfWeek = getFirstDateOfWeek({ date });
    expect(firstDateOfWeek.toDateString()).toBe("Sun Feb 09 2020");
  });

  it("should return correct date for Nov 2019", () => {
    const date = new Date("2019-11-13");
    const firstDateOfWeek = getFirstDateOfWeek({ date });
    expect(firstDateOfWeek.toDateString()).toBe("Sun Nov 10 2019");
  });

  it("should return correct date for Jan 2019", () => {
    const date = new Date("2019-01-02");
    const firstDateOfWeek = getFirstDateOfWeek({ date });
    expect(firstDateOfWeek.toDateString()).toBe("Sun Dec 30 2018");
  });
});

describe("getFirstDateInMonth", () => {
  it("should return first date", () => {
    const date = new Date("2020-02-15");
    const firstDateInMonth = getFirstDateInMonth({ date });
    expect(firstDateInMonth.toDateString()).toBe("Sat Feb 01 2020");
  });
});

describe("getLastDateInMonth", () => {
  it("should return last date", () => {
    const date = new Date("2020-02-15");
    const lastDateInMonth = getLastDateInMonth({ date });
    expect(lastDateInMonth.toDateString()).toBe("Sat Feb 29 2020");
  });
});

describe("getNextDay", () => {
  it("adds a day in same month", () => {
    const date = new Date("2019-01-02");
    const firstDateOfWeek = getNextDay({ date });
    expect(firstDateOfWeek.toDateString()).toBe("Thu Jan 03 2019");
  });

  it("adds a month and year for last day of year", () => {
    const date = new Date("2019-12-31");
    const firstDateOfWeek = getNextDay({ date });
    expect(firstDateOfWeek.toDateString()).toBe("Wed Jan 01 2020");
  });
});

describe("getWeekData", () => {
  it("gets correct data for week", () => {
    const date = new Date("2019-01-02");
    const firstDateInMonth = getFirstDateOfWeek({ date });
    const lastDateInMonth = getLastDateInMonth({ date });
    const today = new Date();
    const weekData = getWeekData({
      date,
      firstDateInMonth,
      lastDateInMonth,
      selectedDate: date,
      today
    });
    expect(weekData).toMatchSnapshot();
  });
});

describe("getMonthData", () => {
  it("gets correct data for month", () => {
    const date = new Date("2019-01-02");
    const today = new Date();
    const monthData = getMonthData({ date, today });
    expect(monthData).toMatchSnapshot();
  });
});
