// @flow

import React from "react";
import { DatePickerContext } from "./DatePicker";
import { createSelectDateAction } from "./reducer";
import type { DayData, WeekData } from "./types";
import "./Day.css";

export type DayProps = {
  day: DayData
};

export default function Day(props: DayProps) {
  const { day } = props;
  const { selected, dayOfMonth, date } = day;
  const className = selected ? "selected" : "";

  return (
    <DatePickerContext.Consumer>
      {context => {
        const { state, dispatch } = context;
        return (
          <td
            className={className}
            onClick={evt => dispatch(createSelectDateAction({ date }))}
          >
            {dayOfMonth}
          </td>
        );
      }}
    </DatePickerContext.Consumer>
  );
}
