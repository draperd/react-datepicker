// @flow
import React, { useState } from "react";
import DatePicker from "./DatePicker";
import "./App.css";

const initialDate = new Date();
const earliestAllowedDate = new Date();
earliestAllowedDate.setDate(initialDate.getDate() - 45);
const latestAllowedDate = new Date();
latestAllowedDate.setDate(initialDate.getDate() + 45);

const inAWeek = new Date();
inAWeek.setDate(initialDate.getDate() + 7);

function App() {
  const [date, setDate] = useState(initialDate);

  const [earliest, setEarliest] = useState();
  const [latest, setLatest] = useState();

  return (
    <div className="app">
      <h1>React Date Picker Examples</h1>
      <p>
        This page contains some examples of the React Date Picker with various
        configurations.
      </p>

      <section>
        <h4>No initial value, no constraints</h4>
        <p>
          This is an example picker with no initial value and no constraints
        </p>
        <label htmlFor="example1">Example date 1</label>
        <DatePicker id="example1" label="Example date 1" />
      </section>

      <section>
        <h4>Today with constraints</h4>
        <p>
          This is an example picker that is set to today and contrained to
          within 45 days before and after today. Use the button to set the date
          by passing a new prop to the picker.
        </p>
        <button type="button" onClick={() => setDate(inAWeek)}>
          Set the date to a week from now
        </button>
        <p></p>
        <label htmlFor="example2">Example date 2</label>
        <DatePicker
          id="example2"
          label="Example date two"
          value={date}
          earliestAllowedDate={earliestAllowedDate}
          latestAllowedDate={latestAllowedDate}
          onChange={date => setDate(date)}
        />
      </section>

      <section>
        <h4>Setting a date range</h4>
        <p>
          This example shows two date pickers used together to allow a date
          range to be set. When you set a date in the "From" date picker it will
          set a latest date constraint on the "To" picker (and vice versa).
        </p>
        <div className="range">
          <label htmlFor="from">From</label>
          <DatePicker
            id="from"
            latestAllowedDate={latest}
            onChange={date => setEarliest(date)}
          />
          <label htmlFor="to">To</label>
          <DatePicker
            id="to"
            earliestAllowedDate={earliest}
            onChange={date => setLatest(date)}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
