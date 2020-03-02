// @flow

import React, { useReducer } from "react";
import { getLastDateInMonth } from "./utils";
import Calendar from "./Calendar";
import NumberField from "./NumberField";
import type {
  Action,
  CreateOnDayChangedAction,
  CreateOnMonthChangedAction,
  CreateOnYearChangedAction,
  DatePickerProps,
  DispatchAction,
  ReduceOnDayChanged,
  ReduceOnMonthChanged,
  ReduceOnYearChanged,
  State
} from "./types";
import {
  ON_DAY_CHANGED_ACTION,
  ON_MONTH_CHANGED_ACTION,
  ON_YEAR_CHANGED_ACTION
} from "./types";

/* THINGS TO DO:
 * - onBlur input fields to ensure empty number fields get populated with a suitable value
 * - allow date changes to increment / decrement month and year
 * - allow month / year changes to correct a day (e.g. if month cannot handle 30/31 days or 29 days for non-leap year Febs)
 */

// $FlowFixMe
export const DatePickerContext = React.createContext();

export const createOnDayChangedAction: CreateOnDayChangedAction = ({
  value
}) => {
  return {
    type: ON_DAY_CHANGED_ACTION,
    payload: {
      value
    }
  };
};

export const createOnMonthChangedAction: CreateOnMonthChangedAction = ({
  value
}) => {
  return {
    type: ON_MONTH_CHANGED_ACTION,
    payload: {
      value
    }
  };
};

export const createOnYearChangedAction: CreateOnYearChangedAction = ({
  value
}) => {
  return {
    type: ON_YEAR_CHANGED_ACTION,
    payload: {
      value
    }
  };
};

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

const reduceOnDayChanged: ReduceOnDayChanged = ({ state, action }) => {
  const { proposedDate } = state;
  let {
    payload: { value }
  } = action;

  if (value === "") {
    return {
      ...state,
      dayInputFieldValue: value
    };
  }

  const lastDateInProposedMonth = getLastDateInMonth({ date: proposedDate });
  const lastDayInMonth = lastDateInProposedMonth.getDate();

  // TODO: Do we want to clock over to the next month?
  if (value > lastDayInMonth) {
    value = lastDayInMonth;
  }

  const updatedProposedDate = new Date(
    proposedDate.getFullYear(),
    proposedDate.getMonth(),
    value
  );

  return {
    ...state,
    proposedDate: updatedProposedDate,
    dayInputFieldValue: value
  };
};

const reduceOnMonthChanged: ReduceOnMonthChanged = ({ state, action }) => {
  const { proposedDate } = state;
  let {
    payload: { value }
  } = action;

  if (value === "") {
    return {
      ...state,
      monthInputFieldValue: value
    };
  }

  if (value > 12) {
    value = 12;
  }

  // TODO: What happens if the new month cannot handle the already set number of days?
  const updatedProposedDate = new Date(
    proposedDate.getFullYear(),
    value - 1,
    proposedDate.getDate()
  );

  return {
    ...state,
    proposedDate: updatedProposedDate,
    monthInputFieldValue: value
  };
};

const reduceOnYearChanged: ReduceOnYearChanged = ({ state, action }) => {
  const { proposedDate } = state;
  let {
    payload: { value }
  } = action;

  if (value === "" || value < 1000) {
    return {
      ...state,
      yearInputFieldValue: value
    };
  }

  const updatedProposedDate = new Date(
    value,
    proposedDate.getMonth(),
    proposedDate.getDate()
  );

  return {
    ...state,
    yearInputFieldValue: value,
    proposedDate: updatedProposedDate
  };
};

function fieldsReducer(state: State, action: Action) {
  switch (action.type) {
    case ON_DAY_CHANGED_ACTION: {
      return reduceOnDayChanged({ state, action });
    }
    case ON_MONTH_CHANGED_ACTION: {
      return reduceOnMonthChanged({ state, action });
    }
    case ON_YEAR_CHANGED_ACTION: {
      return reduceOnYearChanged({ state, action });
    }
    default:
      return state;
  }
}

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
  const [state, dispatch] = useReducer(fieldsReducer, initialState);
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
