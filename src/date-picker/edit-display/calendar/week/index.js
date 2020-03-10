// @flow

import React from "react";
import Day from "./day";
import type { Props } from "./types";

export default function Week(props: Props) {
  const { days } = props;

  return (
    <tr>
      <Day day={days[0]} />
      <Day day={days[1]} />
      <Day day={days[2]} />
      <Day day={days[3]} />
      <Day day={days[4]} />
      <Day day={days[5]} />
      <Day day={days[6]} />
    </tr>
  );
}
