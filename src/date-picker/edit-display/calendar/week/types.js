// @flow
import type { DayData } from "./day/types";

export type WeekData = {
  [number]: DayData
};

export type Props = {
  days: WeekData
};
