// @flow

import React from "react";
import Day from "./Day";
import { getMonthData } from "./utils";
import type { WeekData } from "./types";
import "./Calendar.css";

export type Props = {
  date: Date
};

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

export default function Calendar(props: Props) {
  const { date } = props;
  const today = new Date();
  const weeksInMonth = getMonthData({ date, today });
  const weeks = weeksInMonth.map((week, index) => (
    <Week key={`week_${index}`} days={week} />
  ));

  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return (
    <div className="calendar">
      <div className="monthDisplay">
        {month} {year}
      </div>
      <table className="week">
        <CalendarHeader />
        <tbody>{weeks}</tbody>
      </table>
    </div>
  );
}
