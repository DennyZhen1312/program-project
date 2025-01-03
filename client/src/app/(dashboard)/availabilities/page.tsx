// Page just to test the component.

import { getAvailabilities } from "@/actions/availabilities";
import { redirect } from "next/navigation";

export default async function Availability() {
  const availabilities = await getAvailabilities();

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Availabilities</h1>
      </div>

      <div className="w-full">
        <div className="w-full flex mb-4">
          <p className="w-full text-lg">Start Date</p>
          <p className="w-full text-lg">End Date</p>
        </div>
        <div className="flex flex-col gap-4">
          {availabilities.map(({ id, startDate, endDate }) => (
            <form
              key={id}
              action={async () => {
                "use server";

                redirect(`/availabilities/${id}`);
              }}
            >
              <button className="w-full transition duration-200">
                <div className="bg-white shadow rounded-lg flex py-4 hover:bg-gray-100 hover:shadow-md">
                  <p className="w-full text-left px-4">
                    {startDate.toString()}
                  </p>
                  <p className="w-full text-left">{endDate.toString()}</p>
                </div>
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
