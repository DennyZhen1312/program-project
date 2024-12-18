"use client";


// pages/scheduler.tsx
import React, { useEffect } from "react";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-schedule/styles/material.css";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpR2ZGfV5ycEVPal9RTnNfUiweQnxTdEFiW35WcH1WRmVcU0dwVw==');

const Scheduler = () => {
  const eventData = [
    {
      Id: 1,
      Subject: "Conference",
      StartTime: new Date(2024, 11, 17, 10, 0),
      EndTime: new Date(2024, 11, 17, 12, 30),
    },
    {
      Id: 2,
      Subject: "Meeting",
      StartTime: new Date(2024, 11, 18, 9, 0),
      EndTime: new Date(2024, 11, 18, 11, 0),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Syncfusion EJ2 Scheduler</h1>
      <ScheduleComponent
        height="550px"
        selectedDate={new Date(2024, 11, 17)}
        // eventSettings={{ dataSource: eventData, fields: {
        //   location: {
        //     title: null
        //   }
        // } }}
        popupOpen={(args) => console.log(args)
        }
        timeScale={{ enable: false }}
        
      >
        <Inject services={Week} />
      </ScheduleComponent>
    </div>
  );
};


export default Scheduler;
