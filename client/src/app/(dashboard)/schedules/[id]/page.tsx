import { getAvailabilities } from "@/actions/availabilities";
import { getEmployees } from "@/actions/employees";
import { getSchedule } from "@/actions/schedules";
import { Scheduler } from "@/components/schedules/scheduler";

type Props = {
  params: { id: string };
};

export default async function Schedule({ params }: Props) {
  const { startDate, endDate, userSchedules } = await getSchedule(+params.id);
  const employees = await getEmployees();
  const availabilities = await getAvailabilities();

  console.log("availabilities", availabilities);

  return (
    <div className="p-8">
      <Scheduler
        from={startDate}
        to={endDate}
        userSchedules={userSchedules}
        employees={employees}
        availabilities={availabilities}
      />
    </div>
  );
}
