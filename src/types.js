// @flow

export const SHOW_PICKER_ACTION = "showPicker";
export const HIDE_PICKER_ACTION = "hidePicker";
export const ON_DAY_CHANGED_ACTION = "onDayChanged";
export const ON_MONTH_CHANGED_ACTION = "onMonthChanged";
export const ON_YEAR_CHANGED_ACTION = "onYearChanged";
export const SELECT_DATE_ACTION = "selectDate";
export const CLEAR_DATE_ACTION = "clearDate";

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
  selectedDate: Date,
  today: Date,
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date
}) => DayData;

export type WeekData = {
  [number]: DayData
};

export type GetFirstDayOfMonth = Date => number;
export type GetLastDateOfPreviousMonth = Date => number;

export type DateIsAvailable = ({
  date: Date,
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date
}) => boolean;

export type GetWeekData = ({
  date: Date,
  firstDateInMonth: Date,
  lastDateInMonth: Date,
  selectedDate: Date,
  today: Date,
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date
}) => WeekData;

export type GetFirstDateOfWeek = ({ date: Date }) => Date;

export type GetFirstDateInMonth = ({ date: Date }) => Date;
export type GetLastDateInMonth = ({ date: Date }) => Date;
export type GetNextDay = ({ date: Date }) => Date;

export type GetMonthData = ({
  date: Date,
  today: Date,
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date
}) => WeekData[];

export type OnChange = (value?: Date) => void;

export type State = {
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date,
  pickerIsVisible: boolean,
  isValid: boolean,
  proposedDate: Date,
  selectedDate?: Date,
  dayInputFieldValue: number | "",
  monthInputFieldValue: number | "",
  yearInputFieldValue: number | "",
  warning?: string,
  onChange?: OnChange
};

export type DatePickerProps = {
  value?: Date,
  isDisabled?: boolean, // TODO: This needs handling
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date,
  onChange?: OnChange
};
export type CalendarProps = {
  date: Date,
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date
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
export type SelectDateAction = {
  type: typeof SELECT_DATE_ACTION,
  payload: {
    date: Date
  }
};

export type ClearDateAction = {
  type: typeof CLEAR_DATE_ACTION
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
export type CreateSelectDateAction = ({ date: Date }) => SelectDateAction;
export type CreateClearDateAction = () => ClearDateAction;

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
  | OnYearChangedAction
  | SelectDateAction
  | ClearDateAction;

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
  getNewProposedDate: GetNewProposedDate,
  inputFieldStateValue: InputFieldStateValue
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

export type ReduceSelectDate = ({
  state: State,
  action: SelectDateAction
}) => State;

export type ReduceClearDate = ({ state: State, action: Action }) => State;
