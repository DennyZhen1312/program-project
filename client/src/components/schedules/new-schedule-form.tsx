"use client";

import { createSchedule } from "@/actions/schedules";
import moment from "moment";
import { FormEvent, useState } from "react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./date-range-picker";

export default function NewScheduleForm() {
  const [date, setDate] = useState<DateRange>({
    from: moment().weekday(7).toDate(),
    to: moment()
      .weekday(7 + 7)
      .toDate()
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createSchedule(date);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <DatePickerWithRange date={date} onSelect={(range) => setDate(range)} />
      <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
        Create New Schedule
      </button>
    </form>
  );
}
