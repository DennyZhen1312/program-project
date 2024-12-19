import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
export const editorTemplate = (props: object): JSX.Element => {
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
