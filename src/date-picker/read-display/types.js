// @flow
import type { DispatchAction, FormatDateOptions, State } from "../types";

export type TriggerProps = any;

export type Props = {
  dispatch: DispatchAction,
  locale?: string,
  formatDateOptions: FormatDateOptions,
  id?: string,
  label: string,
  state: State,
  triggerProps: TriggerProps
};
