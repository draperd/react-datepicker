// @flow

import React from "react";
import Button from "@atlaskit/button";
import ChevronRightIcon from "@atlaskit/icon/glyph/chevron-right";
import ChevronLeftIcon from "@atlaskit/icon/glyph/chevron-left";
import ChevronRightLargeIcon from "@atlaskit/icon/glyph/chevron-right-large";
import ChevronLeftLargeIcon from "@atlaskit/icon/glyph/chevron-left-large";
import { DatePickerContext } from "./DatePicker";
import Day from "./Day";
import {
  createOnMonthChangedAction,
  createOnYearChangedAction,
  createOnDayChangedAction,
  createSelectDateAction
} from "./actions";
import { getMonthData } from "./utils";
import type { CalendarProps, WeekData, DispatchAction } from "./types";
import "./Calendar.css";

function CalendarHeader() {
  return (
    <thead>
      <tr>
        <th>SUN</th>
        <th>MON</th>
        <th>TUE</th>
        <th>WED</th>
        <th>THU</th>
        <th>FRI</th>
        <th>SAT</th>
      </tr>
    </thead>
  );
}

export type WeekProps = {
  days: WeekData
};

function Week(props: WeekProps) {
  const { days } = props;

  return (
    <tr>
      <Day day={days[0]} />
      <Day day={days[1]} />
      <Day day={days[2]} />
      <Day day={days[3]} />
      <Day day={days[4]} />
      <Day day={days[5]} />
      <Day day={days[6]} />
    </tr>
  );
}

export type OnCalendarKeyUpEvent = ({
  event: SyntheticKeyboardEvent<EventTarget>,
  dispatch: DispatchAction,
  date: Date
}) => void;

export const onCalendarKeyUpEvent: OnCalendarKeyUpEvent = ({
  event,
  dispatch,
  date
}) => {
  const keyCode = event.which;
  switch (keyCode) {
    case 13: {
      dispatch(createSelectDateAction({ date }));
      break;
    }
    case 37: {
      const previousDay = date.getDate() - 1;
      dispatch(createOnDayChangedAction({ value: previousDay }));
      break;
    }
    case 38: {
      const previousWeek = date.getDate() - 7;
      dispatch(createOnDayChangedAction({ value: previousWeek }));
      break;
    }
    case 39: {
      const nextDay = date.getDate() + 1;
      dispatch(createOnDayChangedAction({ value: nextDay }));
      break;
    }
    case 40: {
      const nextWeek = date.getDate() + 7;
      dispatch(createOnDayChangedAction({ value: nextWeek }));
      break;
    }
    default: {
      // Return for all other cases so as not to call preventDefault and
      // stopPropogation on the event...
      return;
    }
  }

  // We're going to stop further handling of keyup events if it was a key we've handled
  event.preventDefault();
  event.stopPropagation();
};

export default function Calendar(props: CalendarProps) {
  const { date, earliestAllowedDate, latestAllowedDate } = props;
  const today = new Date();
  const weeksInMonth = getMonthData({
    date,
    today,
    earliestAllowedDate,
    latestAllowedDate
  });
  const weeks = weeksInMonth.map((week, index) => (
    <Week key={`week_${index}`} days={week} />
  ));

  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // NOTE: Months are zero-indexed, but the month field is not hence adding 2 and not substracting anything!
  const nextMonth = date.getMonth() + 2;
  const previousMonth = date.getMonth();
  const nextYear = date.getFullYear() + 1;
  const previousYear = date.getFullYear() - 1;

  // TODO: Would this be better if the button label said what the previous/next month/year would be on click?
  const previousYearLabel = `Previous year`;
  const prevousMonthLabel = `Previous month`;
  const nextMonthLabel = `Next month`;
  const nextYearLabel = `Next year`;

  // TODO: These consts are duplicated from DatePicker, need refactoring to not copy
  const locale = undefined;
  const ariaDateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const ariaDate = date.toLocaleString(locale, ariaDateOptions);

  const calendarLabel = `Date is ${ariaDate}. Use cursor keys to choose a new date or enter to set it`;

  return (
    <DatePickerContext.Consumer>
      {context => {
        const { dispatch } = context;
        return (
          <div className="calendar">
            <div className="monthDisplay">
              <Button
                iconBefore={
                  <ChevronLeftLargeIcon
                    size="small"
                    label={previousYearLabel}
                  />
                }
                appearance="subtle"
                onClick={evt =>
                  dispatch(createOnYearChangedAction({ value: previousYear }))
                }
              />
              <Button
                iconBefore={
                  <ChevronLeftIcon size="small" label={prevousMonthLabel} />
                }
                appearance="subtle"
                onClick={evt =>
                  dispatch(createOnMonthChangedAction({ value: previousMonth }))
                }
              />
              <span>
                {month} {year}
              </span>

              <Button
                iconBefore={
                  <ChevronRightIcon size="small" label={nextMonthLabel} />
                }
                appearance="subtle"
                onClick={evt =>
                  dispatch(createOnMonthChangedAction({ value: nextMonth }))
                }
              />
              <Button
                iconBefore={
                  <ChevronRightLargeIcon size="small" label={nextYearLabel} />
                }
                appearance="subtle"
                onClick={evt =>
                  dispatch(createOnYearChangedAction({ value: nextYear }))
                }
              />
            </div>
            <div
              aria-label={calendarLabel}
              role="listbox"
              tabIndex="0"
              onKeyUp={event => onCalendarKeyUpEvent({ event, dispatch, date })}
            >
              <table className="week">
                <CalendarHeader />
                <tbody>{weeks}</tbody>
              </table>
            </div>
          </div>
        );
      }}
    </DatePickerContext.Consumer>
  );
}
