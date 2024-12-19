import { getSchedule } from "@/actions/schedules";
import { DatePickerWithRange } from "@/components/schedules/date-range-picker";
import { Scheduler } from "@/components/schedules/scheduler";

type Props = {
  params: { id: string };
};

export default async function Schedule({ params }: Props) {
  const { startDate, endDate, userSchedules } = await getSchedule(+params.id);

  return (
    <div>
      <DatePickerWithRange
        date={{ from: startDate, to: endDate }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      />
      <Scheduler from={startDate} to={endDate} userSchedules={userSchedules} />
    </div>
  );
}
