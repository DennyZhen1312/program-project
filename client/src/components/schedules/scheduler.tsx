"use client";

import {
  AddDialogFieldDirective,
  AddDialogFieldsDirective,
  ColumnDirective,
  ColumnsDirective,
  Edit,
  EditDialogFieldDirective,
  EditDialogFieldsDirective,
  GanttComponent,
  Inject,
  Selection,
  Toolbar,
} from "@syncfusion/ej2-react-gantt";

import { Availability, Employee, UserSchedule } from "@prisma/client";
import { registerLicense } from "@syncfusion/ej2-base";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-grids/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-layouts/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-react-gantt/styles/material.css";
import "@syncfusion/ej2-richtexteditor/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-treegrid/styles/material.css";
import { checkEmployeeAvailability } from "@/lib/utils";
import { Alert } from "./alert-dialog";
import { useState } from "react";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpR2ZGfV5ycEVPal9RTnNfUiweQnxTdEFiW35WcH1WRmVcU0dwVw=="
);

type Props = {
  to: Date;
  from: Date;
  userSchedules: (UserSchedule & { employee: Employee })[];
  employees: Employee[];
  availabilities: Availability[];
};

export function Scheduler({
  from,
  to,
  userSchedules,
  employees,
  availabilities,
}: Props) {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleActionComplete = (args: any) => {
    if (
      args.action === "add" ||
      args.action === "TaskbarEditing" ||
      args.action === "DialogEditing"
    ) {
      const result = checkEmployeeAvailability(
        availabilities,
        args.data.Employee,
        args.data.StartTime,
        args.data.EndTime
      );

      if (!result.isAvailable) {
        setAlertMessage(result.message);
      }
    }
  };
  return (
    <>
      <GanttComponent
        durationUnit="Hour"
        dateFormat="MM/dd/yyyy hh:mm:ss a"
        projectStartDate={from}
        timezone="America/Los_Angeles"
        projectEndDate={to}
        dayWorkingTime={[{ from: 0, to: 24 }]}
        timelineSettings={{
          timelineUnitSize: 60,
          topTier: { unit: "Day", format: "MMM dd, yyyy" },
          bottomTier: { unit: "Hour", format: "h:mm a" },
        }}
        dataSource={userSchedules.map(
          ({
            employee: { name },
            startTime,
            endTime,
            employeeId,
            scheduleId,
          }) => ({
            ID: employeeId + scheduleId,
            Employee: name,
            StartTime: startTime,
            EndTime: endTime,
          })
        )}
        actionComplete={handleActionComplete}
        taskFields={{
          id: "ID",
          name: "Name",
          startDate: "StartTime",
          endDate: "EndTime",
        }}
        allowSelection={true}
        editSettings={{
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true,
          allowTaskbarEditing: true,
          showDeleteConfirmDialog: true,
        }}
        toolbar={["Add", "Edit", "Update", "Delete"]}
        height="450px"
      >
        <ColumnsDirective>
          <ColumnDirective field="ID"></ColumnDirective>

          <ColumnDirective
            field="Employee"
            headerText="Employee"
            width="150"
            editType="dropdownedit" // Enable dropdown editor
            edit={{
              params: {
                dataSource: employees.map(({ name }) => ({
                  text: name,
                  value: name,
                })),
                fields: { text: "text", value: "value" },
              },
            }}
          />

          <ColumnDirective field="StartTime"></ColumnDirective>

          <ColumnDirective field="EndTime"></ColumnDirective>
        </ColumnsDirective>
        <AddDialogFieldsDirective>
          <AddDialogFieldDirective
            type="General"
            headerText="General"
            fields={["ID", "Employee", "StartTime", "EndTime"]}
          ></AddDialogFieldDirective>
        </AddDialogFieldsDirective>
        <EditDialogFieldsDirective>
          <EditDialogFieldDirective
            type="General"
            headerText="General"
            fields={["ID", "Employee", "StartTime", "EndTime"]}
          ></EditDialogFieldDirective>
        </EditDialogFieldsDirective>

        <Inject services={[Edit, Selection, Toolbar]} />
      </GanttComponent>
      <Alert
        title="Employee Unavailable"
        description={alertMessage}
        isOpen={!!alertMessage}
        onClose={() => setAlertMessage(null)}
      />
    </>
  );
}
