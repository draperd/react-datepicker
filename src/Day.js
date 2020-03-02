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
  const {
    available,
    selected,
    isInCurrentMonth,
    dayOfMonth,
    date,
    today
  } = day;

  const classNames = [];
  if (selected) {
    classNames.push("selected");
  }
  if (isInCurrentMonth) {
    classNames.push("isInCurrentMonth");
  }
  if (today) {
    classNames.push("today");
  }
  if (!available) {
    classNames.push("unavailable");
  }

  return (
    <DatePickerContext.Consumer>
      {context => {
        const { dispatch } = context;
        return (
          <td
            onClick={evt =>
              available && dispatch(createSelectDateAction({ date }))
            }
          >
            <div className={classNames.join(" ")}>{dayOfMonth}</div>
          </td>
        );
      }}
    </DatePickerContext.Consumer>
  );
}
