// @flow

import type {
  Action,
  CreateHidePickerAction,
  CreateShowPickerAction,
  CreateOnDayChangedAction,
  CreateOnMonthChangedAction,
  CreateOnYearChangedAction,
  GetNewProposedDate,
  ReduceHidePicker,
  ReduceShowPicker,
  ReduceDatePartChanged,
  ReduceOnDayChanged,
  ReduceOnMonthChanged,
  ReduceOnYearChanged,
  State
} from "./types";
import {
  HIDE_PICKER_ACTION,
  SHOW_PICKER_ACTION,
  ON_DAY_CHANGED_ACTION,
  ON_MONTH_CHANGED_ACTION,
  ON_YEAR_CHANGED_ACTION
} from "./types";

export const createHidePickerAction: CreateHidePickerAction = () => {
  return {
    type: HIDE_PICKER_ACTION
  };
};

export const createShowPickerAction: CreateShowPickerAction = () => {
  return {
    type: SHOW_PICKER_ACTION
  };
};

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

// Actions to handle
// - select date
// - clear date
// - next month
// - previous month
// - set day
// - set month
// - set year

export const getNewProposedDateForDayChange: GetNewProposedDate = ({
  proposedDate,
  value
}) => {
  return new Date(proposedDate.getFullYear(), proposedDate.getMonth(), value);
};

export const getNewProposedDateForMonthChange: GetNewProposedDate = ({
  proposedDate,
  value
}) => {
  return new Date(
    proposedDate.getFullYear(),
    value - 1,
    proposedDate.getDate()
  );
};

export const getNewProposedDateForYearChange: GetNewProposedDate = ({
  proposedDate,
  value
}) => {
  return new Date(value, proposedDate.getMonth(), proposedDate.getDate());
};

const reduceDatePartChanged: ReduceDatePartChanged = ({
  state,
  action,
  getNewProposedDate
}) => {
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

  const updatedProposedDate = getNewProposedDate({ proposedDate, value });

  return {
    ...state,
    proposedDate: updatedProposedDate,
    dayInputFieldValue: updatedProposedDate.getDate(),
    monthInputFieldValue: updatedProposedDate.getMonth() + 1,
    yearInputFieldValue: updatedProposedDate.getFullYear()
  };
};

const reduceOnDayChanged: ReduceOnDayChanged = ({ state, action }) => {
  return reduceDatePartChanged({
    state,
    action,
    getNewProposedDate: getNewProposedDateForDayChange
  });
};

const reduceOnMonthChanged: ReduceOnMonthChanged = ({ state, action }) => {
  return reduceDatePartChanged({
    state,
    action,
    getNewProposedDate: getNewProposedDateForMonthChange
  });
};

const reduceOnYearChanged: ReduceOnYearChanged = ({ state, action }) => {
  return reduceDatePartChanged({
    state,
    action,
    getNewProposedDate: getNewProposedDateForYearChange
  });
};

const reduceHidePicker: ReduceHidePicker = ({ state, action }) => {
  return {
    ...state,
    pickerIsVisible: false
  };
};

const reduceShowPicker: ReduceShowPicker = ({ state, action }) => {
  return {
    ...state,
    pickerIsVisible: true
  };
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case HIDE_PICKER_ACTION: {
      return reduceHidePicker({ state, action });
    }
    case SHOW_PICKER_ACTION: {
      return reduceShowPicker({ state, action });
    }
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
