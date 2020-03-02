// @flow

import React from "react";
import Button from "@atlaskit/button";
import ChevronRightIcon from "@atlaskit/icon/glyph/chevron-right";
import ChevronLeftIcon from "@atlaskit/icon/glyph/chevron-left";
import { DatePickerContext } from "./DatePicker";
import Day from "./Day";
import { createOnMonthChangedAction } from "./reducer";
import { getMonthData } from "./utils";
import type { CalendarProps, WeekData } from "./types";
import "./Calendar.css";

function CalendarHeader() {
  return (
    <thead>
      <tr>
        <th>SUN</th>
        <th>MON</th>
        <th>TUE</th>
        <th>WED</th>
        <th>THU</th>
        <th>FRI</th>
        <th>SAT</th>
      </tr>
    </thead>
  );
}

export type WeekProps = {
  days: WeekData
};

function Week(props: WeekProps) {
  const { days } = props;

  return (
    <tr>
      <Day day={days[0]} />
      <Day day={days[1]} />
      <Day day={days[2]} />
      <Day day={days[3]} />
      <Day day={days[4]} />
      <Day day={days[5]} />
      <Day day={days[6]} />
    </tr>
  );
}

export default function Calendar(props: CalendarProps) {
  const { date, earliestAllowedDate, latestAllowedDate } = props;
  const today = new Date();
  const weeksInMonth = getMonthData({
    date,
    today,
    earliestAllowedDate,
    latestAllowedDate
  });
  const weeks = weeksInMonth.map((week, index) => (
    <Week key={`week_${index}`} days={week} />
  ));

  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // NOTE: Months are zero-indexed, but the month field is not hence adding 2 and not substracting anything!
  const nextMonth = date.getMonth() + 2;
  const previousMonth = date.getMonth();
  return (
    <DatePickerContext.Consumer>
      {context => {
        const { dispatch } = context;
        return (
          <div className="calendar">
            <div className="monthDisplay">
              <Button
                iconBefore={<ChevronLeftIcon size="small" />}
                onClick={evt =>
                  dispatch(createOnMonthChangedAction({ value: previousMonth }))
                }
              />
              <span>
                {month} {year}
              </span>

              <Button
                iconBefore={<ChevronRightIcon size="small" />}
                onClick={evt =>
                  dispatch(createOnMonthChangedAction({ value: nextMonth }))
                }
              />
            </div>
            <table className="week">
              <CalendarHeader />
              <tbody>{weeks}</tbody>
            </table>
          </div>
        );
      }}
    </DatePickerContext.Consumer>
  );
}
