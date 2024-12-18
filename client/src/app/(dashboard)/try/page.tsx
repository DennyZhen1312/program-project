'use client'

import { GanttComponent, Inject, Edit, Selection, Toolbar, AddDialogFieldsDirective, EditDialogFieldsDirective, EditDialogFieldDirective, AddDialogFieldDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';

import '@syncfusion/ej2-base/styles/material.css';  
import '@syncfusion/ej2-buttons/styles/material.css';  
import '@syncfusion/ej2-calendars/styles/material.css';  
import '@syncfusion/ej2-dropdowns/styles/material.css';  
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-layouts/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-grids/styles/material.css';
import '@syncfusion/ej2-richtexteditor/styles/material.css';
import '@syncfusion/ej2-treegrid/styles/material.css';
import "@syncfusion/ej2-react-gantt/styles/material.css";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpR2ZGfV5ycEVPal9RTnNfUiweQnxTdEFiW35WcH1WRmVcU0dwVw==');

 const projectResources: object[] = [
    { resourceId: 1, resourceName: 'Project Manager' },
    { resourceId: 2, resourceName: 'Software Analyst' },
    { resourceId: 3, resourceName: 'Developer' },
    { resourceId: 4, resourceName: 'Testing Engineer' }
];

 const data: object[] = [
    {
        TaskID: 1,
        TaskName: 'Project Initiation',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        
    },
    {
        TaskID: 5,
        TaskName: 'Project Estimation',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
       
    },
];



const Home = () => {
  const taskFields = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    station: 'station',
  };

  const editOptions = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };

  const toolbarOptions = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];

  return (
    <GanttComponent
      dataSource={data}
      taskFields={taskFields}
      allowSelection={true}
      editSettings={editOptions}
      toolbar={toolbarOptions}
      height="450px"
      resources={resourceCollection}
    >
      <ColumnsDirective>
        <ColumnDirective
          field="TaskName"
          headerText="TaskName"
          width="250"
          clipMode="EllipsisWithTooltip"
        ></ColumnDirective>
        <ColumnDirective field="station"></ColumnDirective>
      </ColumnsDirective>
      <AddDialogFieldsDirective>
        <AddDialogFieldDirective
          type="General"
          headerText="General"
          fields={['TaskID', 'TaskName', 'station']}
        ></AddDialogFieldDirective>
      </AddDialogFieldsDirective>
      <EditDialogFieldsDirective>
        <EditDialogFieldDirective
          type="General"
          headerText="General"
          fields={['TaskID', 'TaskName', 'station']}
        ></EditDialogFieldDirective>
      </EditDialogFieldsDirective>
      <Inject services={[Edit, Selection, Toolbar]} />
    </GanttComponent>
  );
};

export default Home;