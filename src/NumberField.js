// @flow
import React from "react";
import Textfield from "@atlaskit/textfield";
import { DatePickerContext } from "./DatePicker";
import type { InputFieldStateValue, OnChangeCreateAction } from "./types";
import "./NumberField.css";

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
          <div className="number">
            <label htmlFor={name}>{label}</label>
            <Textfield
              name={name}
              type="number"
              value={state[valueAttributeInState]}
              onChange={evt =>
                dispatch(onChangeCreateAction({ value: evt.target.value }))
              }
              isCompact
            />
          </div>
        );
      }}
    </DatePickerContext.Consumer>
  );
}
