"use client";
import React from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  TimelineViews,
  Inject,
  EventSettingsModel,
  ActionEventArgs,
} from "@syncfusion/ej2-react-schedule";

import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { L10n } from "@syncfusion/ej2-base";

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
};

const editorTemplate = (props: Object): JSX.Element => {
  return props !== undefined ? (
    <table className="custom-event-editor w-full px-6">
      <tbody>
        <tr>
          <td className="e-textlabel">From</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="StartTime"
              data-name="StartTime"
              value={
                new Date((props as any).startTime || (props as any).StartTime)
              }
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">To</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="EndTime"
              data-name="EndTime"
              value={new Date((props as any).endTime || (props as any).EndTime)}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div></div>
  );
};

const ScheduleAvailability = () => {
  const data: object[] = [
    {
      Id: 1,
      Subject: "Meeting - 1",
      StartTime: new Date(2024, 12, 19, 10, 0),
      EndTime: new Date(2024, 12, 19, 12, 30),
      IsAllDay: false,
    },
  ];

  const timeScale: TimeScaleModel = {
    interval: 15,
    slotCount: 1,
  };

  const handleAddSchedule = (args: ActionEventArgs) => {
    console.log("args", args);
  };

  const eventSettings: EventSettingsModel = {
    dataSource: data,
    fields: fieldsData,
  };

  return (
    <ScheduleComponent
      height="550px"
      eventSettings={eventSettings}
      actionComplete={handleAddSchedule}
      // timeScale={timeScale}
      editorTemplate={editorTemplate}
    >
      <Inject services={[Day, Week, TimelineViews]} />
    </ScheduleComponent>
  );
};

export default ScheduleAvailability;
