// @flow

import React, { useReducer } from "react";
import Calendar from "./Calendar";
import NumberField from "./NumberField";
import {
  createShowPickerAction,
  createHidePickerAction,
  createOnDayChangedAction,
  createOnMonthChangedAction,
  createOnYearChangedAction,
  createClearDateAction,
  reducer,
  createSelectDateAction
} from "./reducer";
import type { CreateContext, DatePickerProps, State } from "./types";
import "./DatePicker.css";

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
    isValid: true,
    pickerIsVisible: false,
    selectedDate: value, // This could legitimately be undefined when no date is set
    proposedDate,
    dayInputFieldValue,
    monthInputFieldValue,
    yearInputFieldValue
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const context = createContext({ state, dispatch });

  const displayValue = state.selectedDate
    ? state.selectedDate.toDateString()
    : "";
  return (
    <DatePickerContext.Provider value={context}>
      <div className="main">
        <div className="display">
          <span>{displayValue}</span>
          <button
            type="button"
            onClick={evt => dispatch(createShowPickerAction())}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={evt => dispatch(createClearDateAction())}
          >
            Clear
          </button>
        </div>
        <div
          className={`picker ${state.pickerIsVisible ? "visible" : "hidden"}`}
        >
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
            <button
              type="button"
              disabled={!state.isValid}
              onClick={evt =>
                dispatch(createSelectDateAction({ date: state.proposedDate }))
              }
            >
              Set
            </button>
            <button
              type="button"
              onClick={evt => dispatch(createHidePickerAction())}
            >
              Cancel
            </button>
          </div>
          {state.warning && (
            <div className="warnings">
              <span>{state.warning}</span>
            </div>
          )}
          <Calendar date={state.proposedDate} />
        </div>
      </div>
    </DatePickerContext.Provider>
  );
}
