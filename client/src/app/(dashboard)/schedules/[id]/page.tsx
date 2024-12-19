"use client";

import { DatePickerWithRange } from "@/components/schedules/date-range-picker";
import Scheduler from "@/components/schedules/scheduler";
import moment from "moment";
import React from "react";
import { DateRange } from "react-day-picker";

export default function Schedules() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: moment().weekday(8).toDate(),
    to: moment()
      .weekday(8 + 7)
      .toDate()
  });

  console.log(date);

  return (
    <div>
      <DatePickerWithRange
        date={date}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onSelect={(dateRange: DateRange | undefined) => setDate(dateRange)}
      />
      {date?.from && date.to && <Scheduler from={date.from} to={date.to} />}
    </div>
  );
}
