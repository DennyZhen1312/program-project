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

const data: object[] = [
  {
    ID: 1,
    Name: "Project initiation",
    StartTime: new Date("04/02/2019 01:00 PM"),
    EndTime: new Date("04/02/2019 04:00 PM")
  },
  {
    ID: 5,
    Name: "Project estimation",
    StartTime: new Date("04/2/2019 01:00 PM"),
    EndTime: new Date("04/2/2019 05:00 PM")
  },
  {
    ID: 13,
    Name: "Sign contract",
    StartTime: new Date("04/2/2019")
  },
  {
    ID: 14,
    Name: "Plan timeline",
    StartTime: new Date("02/04/2019"),
    EndTime: new Date("02/10/2019")
  }
];

type Props = {
  to: Date;
  from: Date;
};

export default function Scheduler({ from, to }: Props) {
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
      dataSource={data}
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
