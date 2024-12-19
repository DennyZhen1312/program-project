"use client";

import {
  GanttComponent,
  Inject,
  Edit,
  Selection,
  Toolbar,
  AddDialogFieldsDirective,
  EditDialogFieldsDirective,
  EditDialogFieldDirective,
  AddDialogFieldDirective,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-gantt";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-layouts/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-grids/styles/material.css";
import "@syncfusion/ej2-richtexteditor/styles/material.css";
import "@syncfusion/ej2-treegrid/styles/material.css";
import "@syncfusion/ej2-react-gantt/styles/material.css";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpR2ZGfV5ycEVPal9RTnNfUiweQnxTdEFiW35WcH1WRmVcU0dwVw=="
);

const data: object[] = [
  {
    ID: 1,
    Name: "Project initiation",
    StartTime: new Date("04/02/2019 01:00 PM"),
    EndTime: new Date("04/02/2019 04:00 PM"),
  },
  {
    ID: 5,
    Name: "Project estimation",
    StartTime: new Date("04/03/2019 01:00 PM"),
    EndTime: new Date("04/03/2019 05:00 PM"),
  },
  {
    ID: 13,
    Name: "Sign contract",
    StartTime: new Date("04/04/2019"),
  },
  {
    ID: 14,
    Name: "Plan timeline",
    StartTime: new Date("02/04/2019"),
    EndTime: new Date("02/10/2019"),
  },
];

export default function Schedules () {
  const taskFields = {
    id: "ID",
    name: "Name",
    startDate: "StartTime",
    endDate: "EndTime",
    station: "Station",
  };

 const timelineSettings = {
        timelineUnitSize: 60,

        topTier: {
            unit: 'Day',
            format: 'MMM dd, yyyy'
        },
        bottomTier: {
            unit: 'Hour',
            format: 'h:mm a'
        },
    };
  const editOptions = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };

  const toolbarOptions = [
    "Add",
    "Edit",
    "Update",
    "Delete",
    "Cancel",
    "ExpandAll",
    "CollapseAll",
  ];

  return (
    <GanttComponent
    durationUnit="Hour"
    dateFormat="MM/dd/yyyy hh:mm:ss a"
      timelineSettings={timelineSettings}
      dataSource={data}
      taskFields={taskFields}
      allowSelection={true}
      editSettings={editOptions}
      toolbar={toolbarOptions}
      height="450px"
    >
      <ColumnsDirective>
        <ColumnDirective field="ID" width="80"></ColumnDirective>
        <ColumnDirective
          field="Name"
          headerText="Name"
          width="250"
          clipMode="EllipsisWithTooltip"
        ></ColumnDirective>
        <ColumnDirective field="StartTime"></ColumnDirective>
        <ColumnDirective field="EndTime"></ColumnDirective>
        <ColumnDirective field="Station"></ColumnDirective>
      </ColumnsDirective>
      <AddDialogFieldsDirective>
        <AddDialogFieldDirective
          type="General"
          headerText="General"
          fields={["ID", "Name", "StartTime", "EndTime", "Station"]}
        ></AddDialogFieldDirective>
      </AddDialogFieldsDirective>
      <EditDialogFieldsDirective>
        <EditDialogFieldDirective
          type="General"
          headerText="General"
          fields={["ID", "Name", "StartTime", "EndTime", "Station"]}
        ></EditDialogFieldDirective>
      </EditDialogFieldsDirective>
      <Inject services={[Edit, Selection, Toolbar]} />
    </GanttComponent>
  );
};

