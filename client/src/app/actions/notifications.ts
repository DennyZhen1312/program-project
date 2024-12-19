"use server";

import { auth } from "@clerk/nextjs/server";

type Notification = {
  id: number;
  message: string;
};

// export const getNotifications = (): Notification[] => {
//   return [{ id: 1, message: "Please submit the weekly availability " }];
// };

export const getNotifications = async (): Promise<Notification[]> => {
  const { getToken } = await auth();
  const token = await getToken();
  const response = await fetch("http://localhost:4000/api/notifications", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Something went wrong while getting notifications");
  }

  const notifications: Notification[] = await response.json();

  return notifications;
};
