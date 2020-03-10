// @flow

import React from "react";
import { DatePickerContext } from "../../../../index";
import { createSelectDateAction } from "../../../../actions";
import type { Props } from "./types";
import "./styles.css";

export default function Day(props: Props) {
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
