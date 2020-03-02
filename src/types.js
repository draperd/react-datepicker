// @flow

export const SHOW_PICKER_ACTION = "showPicker";
export const HIDE_PICKER_ACTION = "hidePicker";
export const ON_DAY_CHANGED_ACTION = "onDayChanged";
export const ON_MONTH_CHANGED_ACTION = "onMonthChanged";
export const ON_YEAR_CHANGED_ACTION = "onYearChanged";

export type DatesAreEqual = ({ date1: Date, date2: Date }) => boolean;
export type DateIsBeforeFirstDateInMonth = ({
  currentDate: Date,
  firstDateInMonth: Date
}) => boolean;

export type DateIsAfterLastDateInMonth = ({
  currentDate: Date,
  lastDateInMonth: Date
}) => boolean;

export type DayData = {
  dayOfMonth: number,
  isInCurrentMonth: boolean,
  available: boolean,
  selected: boolean,
  today: boolean,
  date: Date
};

export type CreateDayData = ({
  currentDate: Date,
  firstDateInMonth: Date,
  lastDateInMonth: Date,
  selectedDate: Date
}) => DayData;

export type WeekData = {
  [number]: DayData
};

export type GetFirstDayOfMonth = Date => number;
export type GetLastDateOfPreviousMonth = Date => number;

export type GetWeekData = ({
  date: Date,
  firstDateInMonth: Date,
  lastDateInMonth: Date,
  selectedDate: Date
}) => WeekData;

export type GetFirstDateOfWeek = ({ date: Date }) => Date;

export type GetFirstDateInMonth = ({ date: Date }) => Date;
export type GetLastDateInMonth = ({ date: Date }) => Date;
export type GetNextDay = ({ date: Date }) => Date;

export type GetMonthData = ({ date: Date }) => WeekData[];

export type State = {
  pickerIsVisible: boolean,
  proposedDate: Date,
  selectedDate?: Date,
  dayInputFieldValue: number | "",
  monthInputFieldValue: number | "",
  yearInputFieldValue: number | ""
};
export type DatePickerProps = {
  value?: Date
};

export type ShowPickerAction = {
  type: typeof SHOW_PICKER_ACTION
};

export type HidePickerAction = {
  type: typeof HIDE_PICKER_ACTION
};

export type OnDayChangedAction = {
  type: typeof ON_DAY_CHANGED_ACTION,
  payload: {
    value: number
  }
};
export type OnMonthChangedAction = {
  type: typeof ON_MONTH_CHANGED_ACTION,
  payload: {
    value: number
  }
};
export type OnYearChangedAction = {
  type: typeof ON_YEAR_CHANGED_ACTION,
  payload: {
    value: number
  }
};

export type CreateShowPickerAction = () => ShowPickerAction;
export type CreateHidePickerAction = () => HidePickerAction;
export type CreateOnDayChangedAction = ({
  value: number
}) => OnDayChangedAction;
export type CreateOnMonthChangedAction = ({
  value: number
}) => OnMonthChangedAction;
export type CreateOnYearChangedAction = ({
  value: number
}) => OnYearChangedAction;

export type OnChangeCreateAction =
  | CreateOnDayChangedAction
  | CreateOnMonthChangedAction
  | CreateOnYearChangedAction;
export type InputFieldStateValue =
  | "dayInputFieldValue"
  | "monthInputFieldValue"
  | "yearInputFieldValue";

export type Action =
  | HidePickerAction
  | ShowPickerAction
  | OnDayChangedAction
  | OnMonthChangedAction
  | OnYearChangedAction;

export type DispatchAction = Action => void;

export type ContextType = {
  dispatch: DispatchAction,
  state: State
};

export type CreateContext = ({
  state: State,
  dispatch: DispatchAction
}) => ContextType;

export type GetNewProposedDate = ({
  proposedDate: Date,
  value: number
}) => Date;

export type ReduceDatePartChanged = ({
  state: State,
  action: OnDayChangedAction | OnMonthChangedAction | OnYearChangedAction,
  getNewProposedDate: GetNewProposedDate
}) => State;

export type ReduceOnDayChanged = ({
  state: State,
  action: OnDayChangedAction
}) => State;

export type ReduceOnMonthChanged = ({
  state: State,
  action: OnMonthChangedAction
}) => State;

export type ReduceOnYearChanged = ({
  state: State,
  action: OnYearChangedAction
}) => State;

export type ReduceHidePicker = ({
  state: State,
  action: HidePickerAction
}) => State;

export type ReduceShowPicker = ({
  state: State,
  action: ShowPickerAction
}) => State;
