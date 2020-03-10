// @flow
import React from "react";
import Button, { ButtonGroup } from "@atlaskit/button";
import EditorEditIcon from "@atlaskit/icon/glyph/editor/edit";
import EditorRemoveIcon from "@atlaskit/icon/glyph/editor/remove";
import type { Props } from "./types";
import { createShowPickerAction, createClearDateAction } from "../actions";

export default function ReadDisplay(props: Props) {
  const {
    dispatch,
    id,
    label,
    locale,
    formatDateOptions,
    state,
    triggerProps
  } = props;

  const displayValue = state.selectedDate
    ? state.selectedDate.toDateString()
    : "";

  const ariaDate = state.selectedDate
    ? state.selectedDate.toLocaleDateString(locale, formatDateOptions)
    : "";

  const ariaLabel =
    label + (ariaDate === "" ? " with no date" : ` with date ${ariaDate}`);

  const editButtonLabel = `Edit date of ${label}`;
  const clearButtonLabel = `Clear date for ${label}`;

  return (
    <div id={id} className="display" {...triggerProps}>
      <span
        onClick={evt => dispatch(createShowPickerAction())}
        tabIndex="0"
        aria-label={ariaLabel}
      >
        {displayValue}
      </span>
      <ButtonGroup>
        <Button
          iconBefore={<EditorEditIcon size="small" label={editButtonLabel} />}
          isDisabled={!state.isValid}
          onClick={evt => dispatch(createShowPickerAction())}
          spacing="compact"
        />
        <Button
          iconBefore={
            <EditorRemoveIcon size="small" label={clearButtonLabel} />
          }
          onClick={evt => dispatch(createClearDateAction())}
          spacing="compact"
        />
      </ButtonGroup>
    </div>
  );
}
