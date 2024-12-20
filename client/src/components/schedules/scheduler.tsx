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
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpR2ZGfV5ycEVPal9RTnNfUiweQnxTdEFiW35WcH1WRmVcU0dwVw=="
);

type Props = {
  to: Date;
  from: Date;
  userSchedules: (UserSchedule & { employee: Employee })[];
  availabilities: any;
  formattedStartDate: any;
  formattedEndDate: any;
};

export function Scheduler({ from, to, availabilities }: Props) {
  const [tasks, setTasks] = useState([]);
  const { getToken } = useAuth();

  // Fetch tasks from backend
  const fetchTasks = async () => {
    const token = await getToken();
    try {
      const response = await fetch("http://localhost:4000/api/scheduleTable", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const formattedTasks = data.map((task: any) => ({
        ID: task.id,
        Name: task.name,
        StartTime: new Date(task.startTime),
        EndTime: new Date(task.endTime),
        Station: task.station,
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Handle Gantt actions
  const handleActionComplete = async (args: any) => {
    if (args.requestType === "add") {
      const token = await getToken();
      const task = args.data; // The task being saved
  
      const payload = {
        name: task.Name,
        startTime: task.StartTime.toISOString(),
        endTime: task.EndTime.toISOString(),
        station: task.Station,
        scheduleId: 1, // Adjust based on your logic
      };
  
      try {
        const response = await fetch("http://localhost:4000/api/scheduleTable", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          console.log("Task saved successfully.");
          fetchTasks(); // Refresh tasks to get the updated data
        } else {
          console.error("Error saving task:", await response.text());
        }
      } catch (error) {
        console.error("Error during save action:", error);
      }
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);  return (
    <GanttComponent
      durationUnit="Hour"
      dateFormat="MM/dd/yyyy hh:mm:ss a"
      actionComplete={handleActionComplete}
      projectStartDate={from}
      timezone="America/Los_Angeles"
      projectEndDate={to}
      dayWorkingTime={[{ from: 0, to: 24 }]}
      timelineSettings={{
        timelineUnitSize: 60,
        topTier: { unit: "Day", format: "MMM dd, yyyy" },
        bottomTier: { unit: "Hour", format: "h:mm a" },
      }}
      dataSource={tasks}
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
        <ColumnDirective
          field="Name"
          headerText="Name"
          width="250"
          clipMode="EllipsisWithTooltip"
          editType="dropdownedit"
          edit={{
            params: {
              dataSource: availabilities.map((employees) => employees.name), // Dynamically fetched employees
              fields: { text: "text", value: "value" },
            },
          }}
        ></ColumnDirective>
        <ColumnDirective
          field="StartTime"
          headerText="StartTime"
          editType="dropdownedit"
          edit={{
            params: {
              dataSource: [
                {
                  text: "12/14/2024 07:09:00 PM",
                  value: "12/14/2024 07:09:00 PM",
                },
              ],
              fields: { text: "text", value: "value" },
            },
          }}
        ></ColumnDirective>
        <ColumnDirective
          field="EndTime"
          headerText="EndTime"
          editType="dropdownedit"
          edit={{
            params: {
              dataSource: [
                {
                  text: "12/15/2024 07:09:00 PM",
                  value: "12/15/2024 07:09:00 PM",
                },
              ],
              fields: { text: "text", value: "value" },
            },
          }}
        ></ColumnDirective>
        <ColumnDirective field="ID" width="80"></ColumnDirective>
        <ColumnDirective field='Station' width='250'></ColumnDirective>
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
}
