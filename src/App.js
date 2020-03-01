// @flow
import React from "react";
import "./App.css";
import { getMonthData } from "./utils";

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

function Calendar() {
  const weeksInMonth = getMonthData({ date: new Date() });

  const weeks = weeksInMonth.map(week => <Week days={week} />);

  return (
    <div className="calendar">
      <table className="week">
        <CalendarHeader />
        <tbody>{weeks}</tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="display">
        <span>Formatted date goes here</span>
      </div>
      <div className="input-row">
        <input type="number" name="day" />
        <input type="number" name="month" />
        <input type="number" name="year" />
      </div>
      <div className="warnings">
        <span>Warnings go here</span>
      </div>
      <Calendar />
    </div>
  );
}

export default App;
