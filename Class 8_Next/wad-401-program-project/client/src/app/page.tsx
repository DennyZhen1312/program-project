import PostAvailability from "./components/post-availability";
import RequestAvailability from "./components/request-availability";
import ScheduleAvailability from "./components/schedule-availability";
export default function Home() {
  return (
    <>
      <div>Home</div>
      <RequestAvailability />
      <PostAvailability />
      <ScheduleAvailability />
    </>
  );
}
