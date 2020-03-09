// @flow
import React from "react";
import Textfield from "@atlaskit/textfield";
import { DatePickerContext } from "./DatePicker";
import type { InputFieldStateValue, OnChangeCreateAction } from "./types";
import "./NumberField.css";

type SetInitialFocusRef = (ref: any) => void;

export type NumberFieldProps = {
  label: string,
  name: string,
  onChangeCreateAction: OnChangeCreateAction,
  valueAttributeInState: InputFieldStateValue,
  setInitialFocusRef?: SetInitialFocusRef
};
export default function NumberField(props: NumberFieldProps) {
  const {
    label,
    name,
    onChangeCreateAction,
    valueAttributeInState,
    setInitialFocusRef
  } = props;
  return (
    <DatePickerContext.Consumer>
      {context => {
        const { state, dispatch } = context;
        return (
          <div className="number">
            <label htmlFor={name}>{label}</label>
            <Textfield
              aria-label={label}
              name={name}
              type="number"
              value={state[valueAttributeInState]}
              onChange={evt =>
                dispatch(onChangeCreateAction({ value: evt.target.value }))
              }
              isCompact
              ref={ref => setInitialFocusRef && setInitialFocusRef(ref)}
            />
          </div>
        );
      }}
    </DatePickerContext.Consumer>
  );
}
