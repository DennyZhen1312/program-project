"use client";

import { createEmployeeAvailability } from "@/actions/availabilities";
import { editorTemplate } from "@/app/components/editor-template";
import { EmployeeAvailability } from "@prisma/client";
import { L10n, registerLicense } from "@syncfusion/ej2-base";
import {
  Inject,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective
} from "@syncfusion/ej2-react-schedule";
import {
  ActionEventArgs,
  Day,
  EventSettingsModel,
  PopupOpenEventArgs,
  TimelineViews,
  Week
} from "@syncfusion/ej2-schedule";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpR2ZGfV5ycEVPal9RTnNfUiweQnxTdEFiW35WcH1WRmVcU0dwVw=="
);

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Add",
      cancelButton: "Close",
      deleteButton: "Remove",
      newEvent: "Add Availability"
    }
  }
});

type Props = {
  employeeAvailabilities: EmployeeAvailability[];
  availabilityId: number;
};

export function AvailabilityScheduler({
  employeeAvailabilities,
  availabilityId
}: Props) {
  const onPopupOpen = (args: PopupOpenEventArgs): void => {
    if (args.type === "QuickInfo" && args.data && !args.data.Guid) {
      args.cancel = true;
    }
  };

  const eventSettings: EventSettingsModel = {
    dataSource: employeeAvailabilities.map(({ id, endTime, startTime }) => ({
      Id: id,
      StartTime: new Date(startTime),
      EndTime: new Date(endTime),
      Subject: `${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`
    }))
  };

  return (
    <div>
      <ScheduleComponent
        eventSettings={eventSettings}
        actionComplete={(args: ActionEventArgs) =>
          createEmployeeAvailability(args, availabilityId)
        }
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
}
