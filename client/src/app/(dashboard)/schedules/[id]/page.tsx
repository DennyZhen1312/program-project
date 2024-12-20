import { getAvailabilities } from "@/actions/availability";
import { getSchedule } from "@/actions/schedules";
import { DatePickerWithRange } from "@/components/schedules/date-range-picker";
import { Scheduler } from "@/components/schedules/scheduler";

type Props = {
  params: { id: string };
};

export default async function Schedule({ params }: Props) {
  const { startDate, endDate, userSchedules } = await getSchedule(+params.id);
  const availabilities = await getAvailabilities()
  
  const formattedAvailabilities = availabilities.map((availability) => {
    const date = new Date(availability.startDate);
  
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12
    const hourStr = String(hours).padStart(2, '0');
  
    const formattedDate = `${month}/${day}/${year} ${hourStr}:${minutes}:${seconds} ${ampm}`;
  
    return {
      ...availability,
      formattedStartDate: formattedDate,
    };
  });

  const formattedAvailabilities2 = availabilities.map((availability) => {
    const date = new Date(availability.endDate);
  
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set it to 12
    const hourStr = String(hours).padStart(2, '0');
  
    const formattedDate = `${month}/${day}/${year} ${hourStr}:${minutes}:${seconds} ${ampm}`;
  
    return {
      ...availability,
      formattedEndDate: formattedDate,
    };
  });
  
  console.log("availabilities",availabilities)
  console.log("formattedAvailabilities",formattedAvailabilities.map(a=>a.formattedStartDate).toString())
  console.log("formattedAvailabilities",formattedAvailabilities2.map(a=>a.formattedStartDate).toString())

  console.log('03/05/2024 07:09:00 PM')
  return (
    <div>
      <DatePickerWithRange
        date={{ from: startDate, to: endDate }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      />
      <Scheduler from={startDate} to={endDate} userSchedules={userSchedules} availabilities={availabilities} formattedStartDate={formattedAvailabilities} formattedEndDate={formattedAvailabilities2}/>
    </div>
  );
}
