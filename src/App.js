// @flow
import React from "react";
import DatePicker from "./DatePicker";
import "./App.css";

const initialDate = new Date();
const earliestAllowedDate = new Date();
earliestAllowedDate.setDate(-45);
const latestAllowedDate = new Date();
latestAllowedDate.setDate(45);

function App() {
  return (
    <DatePicker
      value={initialDate}
      earliestAllowedDate={earliestAllowedDate}
      latestAllowedDate={latestAllowedDate}
    />
  );
}

export default App;
