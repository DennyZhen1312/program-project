"use client";

import { createSchedule } from "@/actions/actions/schedules";

export default function Schedules() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Schedules</h1>
        <form action={createSchedule}>
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
            Create New Schedule
          </button>
        </form>
      </div>

      {/* {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="w-full">
          <div className="w-full flex mb-4">
            <p className="w-full text-lg">Station Name</p>
            <p className="w-full text-lg">Description</p>
          </div>
          <div className="flex flex-col gap-4">
            {stations.map((station: StationType) => (
              <button
                key={station.id}
                onClick={() => handleStationClick(station.id)}
                className="w-full transition duration-200"
              >
                <div className="bg-white shadow rounded-lg flex py-4 hover:bg-gray-100 hover:shadow-md">
                  <p className="w-full text-left px-4">{station.name}</p>
                  <p className="w-full text-left">
                    {station.description === ""
                      ? "No description provided"
                      : station.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
