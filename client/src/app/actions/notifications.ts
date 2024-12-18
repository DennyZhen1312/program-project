"use server";

type Notification = {
  id: number;
  message: string;
};

export const getNotifications = (): Notification[] => {
  return [{ id: 1, message: "Please submit the weekly availability " }];
};
