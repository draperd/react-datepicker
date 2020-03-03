// @flow
import React, { useState } from "react";
import DatePicker from "./DatePicker";
import "./App.css";

const initialDate = new Date();
const earliestAllowedDate = new Date();
earliestAllowedDate.setDate(-45);
const latestAllowedDate = new Date();
latestAllowedDate.setDate(45);

const inAWeek = new Date();
inAWeek.setDate(7);
const onChange = date => console.log("Date changed to", date);

function App() {
  const [date, setDate] = useState(initialDate);
  return (
    <div>
      <button type="button" onClick={() => setDate(inAWeek)}>
        Set to a week from now
      </button>

      <DatePicker
        value={date}
        earliestAllowedDate={earliestAllowedDate}
        latestAllowedDate={latestAllowedDate}
        onChange={onChange}
      />
    </div>
  );
}

export default App;
