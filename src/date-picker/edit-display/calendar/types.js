// @flow
import type { DispatchAction } from "../../types";
export type Props = {
  date: Date,
  earliestAllowedDate?: Date,
  latestAllowedDate?: Date
};

export type OnCalendarKeyUpEvent = ({
  event: SyntheticKeyboardEvent<EventTarget>,
  dispatch: DispatchAction,
  date: Date
}) => void;
