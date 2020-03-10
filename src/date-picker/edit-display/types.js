// @flow
import type { SetInitialFocusRef } from "./number-field/types";
import type { DispatchAction, FormatDateOptions, State } from "../types";

export type Props = {
  dispatch: DispatchAction,
  state: State,
  label: string,
  locale?: string,
  formatDateOptions: FormatDateOptions,
  id?: string,
  setInitialFocusRef: SetInitialFocusRef
};
