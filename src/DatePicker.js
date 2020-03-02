// @flow

import React, { useReducer } from "react";
import Button, { ButtonGroup } from "@atlaskit/button";
import EditorEditIcon from "@atlaskit/icon/glyph/editor/edit";
import EditorDoneIcon from "@atlaskit/icon/glyph/editor/done";
import EditorCloseIcon from "@atlaskit/icon/glyph/editor/close";
import EditorRemoveIcon from "@atlaskit/icon/glyph/editor/remove";
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
  const { value, earliestAllowedDate, latestAllowedDate } = props;

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
    yearInputFieldValue,
    earliestAllowedDate,
    latestAllowedDate
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
          <ButtonGroup>
            <Button
              iconBefore={<EditorEditIcon size="small" />}
              isDisabled={!state.isValid}
              onClick={evt => dispatch(createShowPickerAction())}
              spacing="compact"
            />
            <Button
              iconBefore={<EditorRemoveIcon size="small" />}
              onClick={evt => dispatch(createClearDateAction())}
              spacing="compact"
            />
          </ButtonGroup>
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
            <ButtonGroup>
              <Button
                iconBefore={<EditorDoneIcon size="small" />}
                isDisabled={!state.isValid}
                onClick={evt =>
                  dispatch(createSelectDateAction({ date: state.proposedDate }))
                }
                spacing="compact"
              />
              <Button
                iconBefore={<EditorCloseIcon size="small" />}
                onClick={evt => dispatch(createHidePickerAction())}
                spacing="compact"
              />
            </ButtonGroup>
          </div>
          {state.warning && (
            <div className="warnings">
              <span>{state.warning}</span>
            </div>
          )}
          <Calendar
            date={state.proposedDate}
            earliestAllowedDate={state.earliestAllowedDate}
            latestAllowedDate={state.latestAllowedDate}
          />
        </div>
      </div>
    </DatePickerContext.Provider>
  );
}
