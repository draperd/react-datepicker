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
  const {
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
  } = days;
  return (
    <tr>
      <td>{sunday.dayOfMonth}</td>
      <td>{monday.dayOfMonth}</td>
      <td>{tuesday.dayOfMonth}</td>
      <td>{wednesday.dayOfMonth}</td>
      <td>{thursday.dayOfMonth}</td>
      <td>{friday.dayOfMonth}</td>
      <td>{saturday.dayOfMonth}</td>
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
