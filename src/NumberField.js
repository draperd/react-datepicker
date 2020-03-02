// @flow
import React from "react";
import { DatePickerContext } from "./DatePicker";
import type { InputFieldStateValue, OnChangeCreateAction } from "./types";

export type NumberFieldProps = {
  label: string,
  name: string,
  onChangeCreateAction: OnChangeCreateAction,
  valueAttributeInState: InputFieldStateValue
};
export default function NumberField(props: NumberFieldProps) {
  const { label, name, onChangeCreateAction, valueAttributeInState } = props;
  return (
    <DatePickerContext.Consumer>
      {context => {
        const { state, dispatch } = context;
        return (
          <>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              type="number"
              name={name}
              value={state[valueAttributeInState]}
              onChange={evt =>
                dispatch(onChangeCreateAction({ value: evt.target.value }))
              }
            />
          </>
        );
      }}
    </DatePickerContext.Consumer>
  );
}
