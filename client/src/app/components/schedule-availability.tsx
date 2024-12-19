"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
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

const ScheduleAvailability = () => {
  const { getToken } = useAuth();
  const [events, setEvents] = useState([]); // State to store schedule data

  // Fetch availability from backend
  const fetchAvailability = async () => {
    try {
      const token = await getToken(); // Get Clerk token
      const response = await fetch("http://localhost:4000/api/employeeAvailability", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Map backend data to format compatible with ScheduleComponent
        const mappedData = data.map((item: any) => ({
          Id: item.id,
          StartTime: new Date(item.startDate),
          EndTime: new Date(item.endDate),
          Subject: item.name, // Populate the Subject field dynamically
        }));
        setEvents(mappedData);
      } else {
        console.error("Failed to fetch availability:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  useEffect(() => {
    fetchAvailability(); // Fetch data on component mount
  }, []);

  const handleAddSchedule = async (args: ActionEventArgs) => {
    if (
      args.requestType === "eventCreated" ||
      args.requestType === "eventChanged"
    ) {
      const event = args.addedRecords?.[0] || args.changedRecords?.[0];
      if (event) {
        const availability = {
          startDate: new Date(event.StartTime).toISOString(),
          endDate: new Date(event.EndTime).toISOString(),
        };

        try {
          const token = await getToken();

          const response = await fetch(
            "http://localhost:4000/api/employeeAvailability",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ availability }),
            }
          );

          if (response.ok) {
            console.log("Availability submitted successfully");
            fetchAvailability(); // Refresh the schedule after adding/updating
          } else {
            console.error(
              "Failed to submit availability:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error submitting availability:", error);
        }
      }
    } else if (args.requestType === "eventRemoved") {
      console.log("Event removed:", args.deletedRecords?.[0]);
      // Handle delete functionality if needed.
    }
  };

  const eventSettings: EventSettingsModel = {
    fields: {
      id: "Id",
      subject: { name: "Subject", title: "Employee Name" }, // Dynamic field mapping
      startTime: { name: "StartTime", title: "Start Duration" },
      endTime: { name: "EndTime", title: "End Duration" },
    },
    dataSource: events, // Use the fetched events as data source
  };

  const onPopupOpen = (args: PopupOpenEventArgs): void => {
    if (args.type === "QuickInfo" && args.data && !args.data.Guid) {
      args.cancel = true;
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default ScheduleAvailability;
