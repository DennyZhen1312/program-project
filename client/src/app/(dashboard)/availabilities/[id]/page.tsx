import { getEmployeeAvailabilities } from "@/actions/availabilities";
import { AvailabilityScheduler } from "@/components/availabilities/availability-scheduler";

// Page just to test the component.

type Props = {
  params: {
    id: string;
  };
};

export default async function Availability({ params: { id } }: Props) {
  const employeeAvailabilities = await getEmployeeAvailabilities(+id);

  return (
    <div className="p-8">
      <AvailabilityScheduler
        employeeAvailabilities={employeeAvailabilities}
        availabilityId={+id}
      />
    </div>
  );
}
