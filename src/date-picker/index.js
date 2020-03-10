// @flow

import React, { useReducer, useEffect, useRef } from "react";
import Popup from "@atlaskit/popup";
import EditDisplay from "./edit-display";
import ReadDisplay from "./read-display";
import { reducer } from "./reducer";
import {
  createClearDateAction,
  createHidePickerAction,
  createSelectDateAction,
  createSetConstraintsAction
} from "./actions";
import type { CreateContext, DatePickerProps, State } from "./types";
import "./styles.css";

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
    ref.current = props;
  });

  /* The following section is very much a work in progress experimenting with good messages for accessibility, this
     needs to be refactored into more suitable functions for clarity / code cleanliness */
  const locale = undefined;
  const ariaDateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return (
    <DatePickerContext.Provider value={context}>
      <Popup
        isOpen={state.pickerIsVisible}
        onClose={() => dispatch(createHidePickerAction())}
        placement="bottom-start"
        content={({ setInitialFocusRef }) => (
          <EditDisplay
            id={id}
            label={label}
            dispatch={dispatch}
            setInitialFocusRef={setInitialFocusRef}
            state={state}
            locale={locale}
            formatDateOptions={ariaDateOptions}
          />
        )}
        trigger={triggerProps => (
          <ReadDisplay
            id={id}
            label={label}
            dispatch={dispatch}
            state={state}
            locale={locale}
            formatDateOptions={ariaDateOptions}
            triggerProps={triggerProps}
          />
        )}
      />
    </DatePickerContext.Provider>
  );
}
