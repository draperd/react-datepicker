// @flow
import React from "react";
import Button, { ButtonGroup } from "@atlaskit/button";
import EditorDoneIcon from "@atlaskit/icon/glyph/editor/done";
import EditorCloseIcon from "@atlaskit/icon/glyph/editor/close";
import Calendar from "./calendar";
import NumberField from "./number-field";
import {
  createOnDayChangedAction,
  createOnMonthChangedAction,
  createOnYearChangedAction,
  createSelectDateAction,
  createHidePickerAction
} from "../actions";
import type { Props } from "./types";

export default function EditDisplay(props: Props) {
  const {
    formatDateOptions,
    id,
    label,
    locale,
    setInitialFocusRef,
    dispatch,
    state
  } = props;

  const ariaProposedDate = state.proposedDate
    ? state.proposedDate.toLocaleDateString(locale, formatDateOptions)
    : "";
  const dialogTitle = `${id || ""}-dialog-title`;
  const saveDateButtonLabel = ariaProposedDate
    ? `Save the date ${ariaProposedDate} for ${label}`
    : "Cannot save date";
  const cancelButtonLabel = `Abandon editing date for ${label}`;

  return (
    <div role="dialog" className="main" aria-labelledby={dialogTitle}>
      <h2 id={dialogTitle}>Select a date for {label}</h2>
      <div className="picker">
        <div className="input-row">
          <NumberField
            label="Day"
            name="day"
            onChangeCreateAction={createOnDayChangedAction}
            valueAttributeInState="dayInputFieldValue"
            setInitialFocusRef={setInitialFocusRef}
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
          <ButtonGroup>
            <Button
              iconBefore={
                <EditorDoneIcon size="small" label={saveDateButtonLabel} />
              }
              appearance="subtle"
              isDisabled={!state.isValid}
              onClick={evt =>
                dispatch(createSelectDateAction({ date: state.proposedDate }))
              }
              spacing="compact"
            ></Button>
            <Button
              iconBefore={
                <EditorCloseIcon size="small" label={cancelButtonLabel} />
              }
              appearance="subtle"
              onClick={evt => dispatch(createHidePickerAction())}
              spacing="compact"
            />
          </ButtonGroup>
        </div>
        <Calendar
          date={state.proposedDate}
          earliestAllowedDate={state.earliestAllowedDate}
          latestAllowedDate={state.latestAllowedDate}
        />
        {state.warning && (
          <div className="warnings">
            <span>{state.warning}</span>
          </div>
        )}
      </div>
    </div>
  );
}
