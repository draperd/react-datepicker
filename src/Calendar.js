// @flow

import React from "react";
import { getMonthData } from "./utils";

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

function Week(props) {
  const { days } = props;

  return (
    <tr>
      <td>{days[0].dayOfMonth}</td>
      <td>{days[1].dayOfMonth}</td>
      <td>{days[2].dayOfMonth}</td>
      <td>{days[3].dayOfMonth}</td>
      <td>{days[4].dayOfMonth}</td>
      <td>{days[5].dayOfMonth}</td>
      <td>{days[6].dayOfMonth}</td>
    </tr>
  );
}

export default function Calendar(props: Props) {
  const { date } = props;
  const weeksInMonth = getMonthData({ date });
  const weeks = weeksInMonth.map(week => <Week days={week} />);

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
