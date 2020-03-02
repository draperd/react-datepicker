// @flow

import React from "react";
import { getMonthData } from "./utils";
import type { DayData, WeekData } from "./types";
import "./Calendar.css";

export type Props = {
  date: Date
};

function CalendarHeader() {
  return (
    <thead>
      <tr>
        <th>S</th>
        <th>M</th>
        <th>T</th>
        <th>W</th>
        <th>T</th>
        <th>F</th>
        <th>S</th>
      </tr>
    </thead>
  );
}

export type DayProps = {
  day: DayData
};

function Day(props: DayProps) {
  const { day } = props;
  const { selected, dayOfMonth } = day;
  const className = selected ? "selected" : "";
  return <td className={className}>{dayOfMonth}</td>;
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
  const weeksInMonth = getMonthData({ date });
  const weeks = weeksInMonth.map((week, index) => (
    <Week key={`week_${index}`} days={week} />
  ));

  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return (
    <div className="calendar">
      <div>
        {month} {year}
      </div>
      <table className="week">
        <CalendarHeader />
        <tbody>{weeks}</tbody>
      </table>
    </div>
  );
}
