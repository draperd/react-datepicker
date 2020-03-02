// @flow

import React, { useReducer } from "react";
import Calendar from "./Calendar";
import NumberField from "./NumberField";
import {
  createOnDayChangedAction,
  createOnMonthChangedAction,
  createOnYearChangedAction,
  reducer
} from "./reducer";
import type { CreateContext, DatePickerProps, State } from "./types";

/* THINGS TO DO:
 * - onBlur input fields to ensure empty number fields get populated with a suitable value
 * - allow date changes to increment / decrement month and year
 * - allow month / year changes to correct a day (e.g. if month cannot handle 30/31 days or 29 days for non-leap year Febs)
 */

// $FlowFixMe
export const DatePickerContext = React.createContext();

export const createContext: CreateContext = ({ state, dispatch }) => ({
  state,
  dispatch
});

export default function DatePicker(props: DatePickerProps) {
  const { value } = props;

  const proposedDate = value || new Date(); // Default to today when there is no value provided

  const dayInputFieldValue = proposedDate.getDate();
  const monthInputFieldValue = proposedDate.getMonth() + 1; // Need to add 1 to move from 0 indexed months
  const yearInputFieldValue = proposedDate.getFullYear();

  const initialState: State = {
    selectedDate: value, // This could legitimately be undefined when no date is set
    proposedDate,
    dayInputFieldValue,
    monthInputFieldValue,
    yearInputFieldValue
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const context = createContext({ state, dispatch });

  return (
    <DatePickerContext.Provider value={context}>
      <div className="App">
        <div className="display">
          <span>{proposedDate.toDateString()}</span>
          <button type="button">Edit</button>
          <button type="button">Clear</button>
        </div>
        <div className="input-row">
          <NumberField
            label="Day"
            name="day"
            onChangeCreateAction={createOnDayChangedAction}
            valueAttributeInState="dayInputFieldValue"
          />
          <NumberField
            label="Month"
            name="month"
            onChangeCreateAction={createOnMonthChangedAction}
            valueAttributeInState="monthInputFieldValue"
          />
          <NumberField
            label="Year"
            name="year"
            onChangeCreateAction={createOnYearChangedAction}
            valueAttributeInState="yearInputFieldValue"
          />
          <button type="button">Set</button>
          <button type="button">Cancel</button>
        </div>
        <div className="warnings">
          <span>Warnings go here</span>
        </div>
        <Calendar date={state.proposedDate} />
      </div>
    </DatePickerContext.Provider>
  );
}
