// @flow

import React, { useReducer, useEffect, useRef } from "react";
import Popup from "@atlaskit/popup";
import Button, { ButtonGroup } from "@atlaskit/button";
import EditorEditIcon from "@atlaskit/icon/glyph/editor/edit";
import EditorDoneIcon from "@atlaskit/icon/glyph/editor/done";
import EditorCloseIcon from "@atlaskit/icon/glyph/editor/close";
import EditorRemoveIcon from "@atlaskit/icon/glyph/editor/remove";
import Calendar from "./Calendar";
import NumberField from "./NumberField";
import { reducer } from "./reducer";
import {
  createClearDateAction,
  createShowPickerAction,
  createHidePickerAction,
  createOnDayChangedAction,
  createOnMonthChangedAction,
  createOnYearChangedAction,
  createSelectDateAction,
  createSetConstraintsAction
} from "./actions";
import type { CreateContext, DatePickerProps, State } from "./types";
import "./DatePicker.css";

// $FlowFixMe
export const DatePickerContext = React.createContext();

export const createContext: CreateContext = ({ state, dispatch }) => ({
  state,
  dispatch
});

export default function DatePicker(props: DatePickerProps) {
  const {
    id,
    value,
    earliestAllowedDate,
    latestAllowedDate,
    onChange,
    label = "date picker"
  } = props;

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
    latestAllowedDate,
    onChange
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const context = createContext({ state, dispatch });

  // This is an attempt to track changing in prop value, to update the selected date...
  // However, this updates on each render and we need to be able to process more than once
  const ref = useRef();
  useEffect(() => {
    const previousProps = ref.current;
    if (previousProps) {
      if (previousProps.value !== value) {
        if (value) {
          dispatch(createSelectDateAction({ date: value }));
        } else {
          dispatch(createClearDateAction());
        }
      }

      const {
        earliestAllowedDate: previousEarliestAllowedDate,
        latestAllowedDate: previousLatestAllowedDate
      } = previousProps;
      if (
        previousEarliestAllowedDate !== earliestAllowedDate ||
        previousLatestAllowedDate !== latestAllowedDate
      ) {
        dispatch(
          createSetConstraintsAction({
            earliestAllowedDate,
            latestAllowedDate
          })
        );
      }
    }
    // TODO: Can only set a value via props once, because the prop isn't changing
    ref.current = props;
  });

  const displayValue = state.selectedDate
    ? state.selectedDate.toDateString()
    : "";

  /* The following section is very much a work in progress experimenting with good messages for accessibility, this
     needs to be refactored into more suitable functions for clarity / code cleanliness */
  const locale = undefined;
  const ariaDateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const ariaDate = state.selectedDate
    ? state.selectedDate.toLocaleDateString(locale, ariaDateOptions)
    : "";

  const ariaLabel =
    label + (ariaDate === "" ? " with no date" : ` with date ${ariaDate}`);

  const editButtonLabel = `Edit date of ${label}`;
  const clearButtonLabel = `Clear date for ${label}`;

  const ariaProposedDate = state.proposedDate
    ? state.proposedDate.toLocaleDateString(locale, ariaDateOptions)
    : "";

  const saveDateButtonLabel = ariaProposedDate
    ? `Save the date ${ariaProposedDate} for ${label}`
    : "Cannot save date";
  const cancelButtonLabel = `Abandon editing date for ${label}`;

  const dialogTitle = `${id || ""}-dialog-title`;

  return (
    <DatePickerContext.Provider value={context}>
      <Popup
        isOpen={state.pickerIsVisible}
        onClose={() => dispatch(createHidePickerAction())}
        placement="bottom-start"
        content={({ setInitialFocusRef }) => (
          <div role="dialog" className="main" aria-labelledby={dialogTitle}>
            <h2 id={dialogTitle}>Select a date for {label}</h2>
            <div className="picker">
              <div className="input-row">
                <NumberField
                  label="Day"
                  name="day"
                  onChangeCreateAction={createOnDayChangedAction}
                  valueAttributeInState="dayInputFieldValue"
                  setInitialFocusRef={setInitialFocusRef}
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
                    iconBefore={
                      <EditorDoneIcon
                        size="small"
                        label={saveDateButtonLabel}
                      />
                    }
                    appearance="subtle"
                    isDisabled={!state.isValid}
                    onClick={evt =>
                      dispatch(
                        createSelectDateAction({ date: state.proposedDate })
                      )
                    }
                    spacing="compact"
                  ></Button>
                  <Button
                    iconBefore={
                      <EditorCloseIcon size="small" label={cancelButtonLabel} />
                    }
                    appearance="subtle"
                    onClick={evt => dispatch(createHidePickerAction())}
                    spacing="compact"
                  />
                </ButtonGroup>
              </div>
              <Calendar
                date={state.proposedDate}
                earliestAllowedDate={state.earliestAllowedDate}
                latestAllowedDate={state.latestAllowedDate}
              />
              {state.warning && (
                <div className="warnings">
                  <span>{state.warning}</span>
                </div>
              )}
            </div>
          </div>
        )}
        trigger={triggerProps => (
          <div id={id} className="display" {...triggerProps}>
            <span
              onClick={evt => dispatch(createShowPickerAction())}
              tabIndex="0"
              aria-label={ariaLabel}
            >
              {displayValue}
            </span>
            <ButtonGroup>
              <Button
                iconBefore={
                  <EditorEditIcon size="small" label={editButtonLabel} />
                }
                isDisabled={!state.isValid}
                onClick={evt => dispatch(createShowPickerAction())}
                spacing="compact"
              />
              <Button
                iconBefore={
                  <EditorRemoveIcon size="small" label={clearButtonLabel} />
                }
                onClick={evt => dispatch(createClearDateAction())}
                spacing="compact"
              />
            </ButtonGroup>
          </div>
        )}
      />
    </DatePickerContext.Provider>
  );
}
