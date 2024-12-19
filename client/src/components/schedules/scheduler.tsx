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
  Toolbar
} from "@syncfusion/ej2-react-gantt";

import { Employee, UserSchedule } from "@prisma/client";
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

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpR2ZGfV5ycEVPal9RTnNfUiweQnxTdEFiW35WcH1WRmVcU0dwVw=="
);

type Props = {
  to: Date;
  from: Date;
  userSchedules: (UserSchedule & { employee: Employee })[];
};

export function Scheduler({ from, to, userSchedules }: Props) {
  return (
    <GanttComponent
      durationUnit="Hour"
      dateFormat="MM/dd/yyyy hh:mm:ss a"
      projectStartDate={from}
      projectEndDate={to}
      timelineSettings={{
        timelineUnitSize: 60,
        topTier: { unit: "Week", format: "MMM dd, yyyy" },
        bottomTier: { unit: "Hour", format: "h:mm a" }
      }}
      dataSource={userSchedules.map(
        ({ employee: { id, name }, startTime, endTime }) => ({
          ID: id,
          Name: name,
          StartTime: new Date(startTime),
          EndTime: new Date(endTime)
        })
      )}
      taskFields={{
        id: "ID",
        name: "Name",
        startDate: "StartTime",
        endDate: "EndTime"
      }}
      allowSelection={true}
      editSettings={{
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
      }}
      toolbar={["Add", "Edit", "Update", "Delete"]}
      height="450px"
    >
      <ColumnsDirective>
        <ColumnDirective
          field="Status"
          headerText="Task Status"
          width="150"
          editType="dropdownedit" // Enable dropdown editor
          edit={{
            params: {
              dataSource: [
                { text: "Not Started", value: "Not Started" },
                { text: "In Progress", value: "In Progress" },
                { text: "Completed", value: "Completed" }
              ],
              fields: { text: "text", value: "value" }
            }
          }}
        />
        <ColumnDirective field="ID" width="80"></ColumnDirective>
        <ColumnDirective
          field="Name"
          headerText="Name"
          width="250"
          clipMode="EllipsisWithTooltip"
        ></ColumnDirective>
        <ColumnDirective field="StartTime"></ColumnDirective>
        <ColumnDirective field="EndTime"></ColumnDirective>
      </ColumnsDirective>
      <AddDialogFieldsDirective>
        <AddDialogFieldDirective
          type="General"
          headerText="General"
          fields={["ID", "Name", "StartTime", "EndTime", "Status"]}
        ></AddDialogFieldDirective>
      </AddDialogFieldsDirective>
      <EditDialogFieldsDirective>
        <EditDialogFieldDirective
          type="General"
          headerText="General"
          fields={["ID", "Name", "StartTime", "EndTime", "Status"]}
        ></EditDialogFieldDirective>
      </EditDialogFieldsDirective>
      <Inject services={[Edit, Selection, Toolbar]} />
    </GanttComponent>
  );
}
