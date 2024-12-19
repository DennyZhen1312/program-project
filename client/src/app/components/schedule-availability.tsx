"use client";
import React, { useState } from "react";
import { L10n, registerLicense } from "@syncfusion/ej2-base";

import {
  ScheduleComponent,
  Day,
  Week,
  TimelineViews,
  Inject,
  EventSettingsModel,
  ActionEventArgs,
  PopupOpenEventArgs,
  ViewDirective,
  ViewsDirective,
} from "@syncfusion/ej2-react-schedule";
import { AvailabilityType } from "@/types/types";
import { editorTemplate } from "./editor-template";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpR2ZGfV5ycEVPal9RTnNfUiweQnxTdEFiW35WcH1WRmVcU0dwVw=="
);

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Add",
      cancelButton: "Close",
      deleteButton: "Remove",
      newEvent: "Add Availability",
    },
  },
});
const fieldsData = {
  startTime: { name: "StartTime", title: "Start Duration" },
  endTime: { name: "EndTime", title: "End Duration" },
  subject: {
    name: "Employee Name",
    title: "Employee Name",
    default: "Employee Name",
  },
};

const ScheduleAvailability = () => {
  const [availability, setAvailability] = useState<AvailabilityType>({
    employeeId: 1,
  } as AvailabilityType);

  const handleAddSchedule = (args: ActionEventArgs) => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    if (args.requestType === "eventCreated" && args.addedRecords) {
      const addedEvent = args.addedRecords[0];

      if (addedEvent) {
        const startTime = new Date(addedEvent.StartTime);
        const endTime = new Date(addedEvent.EndTime);
        const dayOfWeek = days[startTime.getDay()];

        setAvailability((prev) => ({
          ...prev,
          [dayOfWeek]: prev[dayOfWeek]
            ? `${
                prev[dayOfWeek]
              },${startTime.toISOString()},${endTime.toISOString()}`
            : `${startTime.toISOString()},${endTime.toISOString()}`,
        }));
      }
    }

    if (args.requestType === "eventChanged" && args.changedRecords) {
      const changedEvent = args.changedRecords[0];

      if (changedEvent) {
        const startTime = new Date(changedEvent.StartTime);
        const endTime = new Date(changedEvent.EndTime);
        const dayOfWeek = days[startTime.getDay()];

        setAvailability((prev) => {
          const updatedDayData = prev[dayOfWeek]
            ?.split(",")
            .filter(
              (time, index, array) =>
                index % 2 === 0 &&
                !(
                  new Date(array[index]).toISOString() ===
                  new Date(changedEvent.StartTime).toISOString()
                )
            )
            .concat(`${startTime.toISOString()},${endTime.toISOString()}`)
            .join(",");

          return {
            ...prev,
            [dayOfWeek]: updatedDayData || null,
          };
        });
      }
    }

    if (args.requestType === "eventRemoved" && args.deletedRecords) {
      const deletedEvent = args.deletedRecords[0];

      if (deletedEvent) {
        const startTime = new Date(deletedEvent.StartTime);
        const dayOfWeek = days[startTime.getDay()];

        setAvailability((prev) => {
          const updatedDayData = prev[dayOfWeek]
            ?.split(",")
            .filter(
              (time, index, array) =>
                index % 2 === 0 &&
                !(
                  new Date(array[index]).toISOString() ===
                  startTime.toISOString()
                )
            )
            .join(",");

          return {
            ...prev,
            [dayOfWeek]: updatedDayData || null,
          };
        });
      }
    }
  };

  const handleSubmitSchedule = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/employeeAvailability",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ availability }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Availability submitted successfully:", result);
      } else {
        console.error("Failed to submit availability:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting availability:", error);
    }
  };

  const eventSettings: EventSettingsModel = {
    fields: fieldsData,
  };

  const onPopupOpen = (args: PopupOpenEventArgs): void => {
    if (args.type === "QuickInfo" && args.data && !args.data.Guid) {
      args.cancel = true;
    } else if (args.type === "QuickInfo" && args.element) {
      const eventDetails = args.element.querySelector(".e-popup-header");
      if (eventDetails) {
        eventDetails.remove();
      }
    }
  };

  return (
    <>
      <ScheduleComponent
        eventSettings={eventSettings}
        actionComplete={handleAddSchedule}
        editorTemplate={editorTemplate}
        popupOpen={onPopupOpen}
      >
        <ViewsDirective>
          <ViewDirective option="Week" />
        </ViewsDirective>
        <Inject services={[Day, Week, TimelineViews]} />
      </ScheduleComponent>
      <button
        onClick={handleSubmitSchedule}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Submit
      </button>
    </>
  );
};

export default ScheduleAvailability;
