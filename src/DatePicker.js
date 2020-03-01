// @flow

import React, { useReducer } from "react";
import Calendar from "./Calendar";

// $FlowFixMe
export const DatePickerContext = React.createContext();

export type State = {};
export type Props = {
  defaultDate?: Date
};

export const DUMMY_ACTION = "dummy";

export type DummyAction = {
  type: typeof DUMMY_ACTION,
  payload: {}
};

export type Actions = DummyAction;

export type DispatchAction = Actions => void;

export type ContextType = {
  dispatch: DispatchAction,
  state: State
};

export type CreateContext = ({
  state: State,
  dispatch: DispatchAction
}) => ContextType;

export const createContext: CreateContext = ({ state, dispatch }) => ({
  state,
  dispatch
});

// Actions to handle
// - select date
// - clear date
// - next month
// - previous month
// - set day
// - set month
// - set year

function fieldsReducer(state: State, action: Actions) {
  switch (action.type) {
    case DUMMY_ACTION: {
      return state;
    }
    default:
      return state;
  }
}

export default function DatePicker(props: Props) {
  const { defaultDate = new Date() } = props;
  const initialState: State = {};
  const [state, dispatch] = useReducer(fieldsReducer, initialState);
  const context = createContext({ state, dispatch });

  return (
    <DatePickerContext.Provider value={context}>
      <div className="App">
        <div className="display">
          <span>Formatted date goes here</span>
        </div>
        <div className="input-row">
          <input type="number" name="day" />
          <input type="number" name="month" />
          <input type="number" name="year" />
        </div>
        <div className="warnings">
          <span>Warnings go here</span>
        </div>
        <Calendar date={defaultDate} />
      </div>
    </DatePickerContext.Provider>
  );
}
