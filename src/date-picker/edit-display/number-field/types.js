// @flow
import type { OnChangeCreateAction, InputFieldStateValue } from "../../types";

export type SetInitialFocusRef = (ref: any) => void;

export type Props = {
  label: string,
  name: string,
  onChangeCreateAction: OnChangeCreateAction,
  valueAttributeInState: InputFieldStateValue,
  setInitialFocusRef?: SetInitialFocusRef
};
