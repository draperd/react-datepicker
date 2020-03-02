// @flow

import React from "react";
import { DatePickerContext } from "./DatePicker";
import { createSelectDateAction } from "./reducer";
import type { DayData } from "./types";
import "./Day.css";

export type DayProps = {
  day: DayData
};

export default function Day(props: DayProps) {
  const { day } = props;
  const { available, selected, isInCurrentMonth, dayOfMonth, date } = day;

  const classNames = [];
  if (selected) {
    classNames.push("selected");
  }
  if (isInCurrentMonth) {
    classNames.push("isInCurrentMonth");
  }

  return (
    <DatePickerContext.Consumer>
      {context => {
        const { dispatch } = context;
        return (
          <td onClick={evt => dispatch(createSelectDateAction({ date }))}>
            <div className={classNames.join(" ")}>{dayOfMonth}</div>
          </td>
        );
      }}
    </DatePickerContext.Consumer>
  );
}
