import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { AlertCircle, Bell } from "lucide-react";
import { getNotifications } from "../../actions/notifications";

export async function Notification() {
  const notifications = await getNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-inherit hover:bg-[#3e3e3e] border-[#3e3e3e] hover:text-white-foreground"
        >
          <Bell className="h-4 w-4" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h2 className="font-semibold">Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No notifications yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`text-sm py-2 rounded flex items-center gap-1`}
                >
                  <AlertCircle className="text-blue-500" />
                  {notification.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
