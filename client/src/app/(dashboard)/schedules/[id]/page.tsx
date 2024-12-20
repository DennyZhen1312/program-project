import { getEmployeeAvailabilities } from "@/actions/availabilities";
import { getEmployees } from "@/actions/employees";
import { getSchedule } from "@/actions/schedules";
import { getShifts } from "@/actions/shfits";
import { Scheduler } from "@/components/schedules/scheduler";

type Props = {
  params: { id: string };
};

export default async function Schedule({ params: { id } }: Props) {
  const { startDate, endDate, userSchedules } = await getSchedule(+id);
  const employeeAvailabilities = await getEmployeeAvailabilities(+id);
  const shifts = await getShifts();
  const employees = await getEmployees();

  return (
    <div className="p-8">
      <Scheduler
        from={startDate}
        to={endDate}
        userSchedules={userSchedules}
        employeeAvailabilities={employeeAvailabilities}
        shifts={shifts}
        employees={employees}
      />
    </div>
  );
}
