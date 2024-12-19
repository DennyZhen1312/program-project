"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const createSchedule = async () => {
  // trigger notification
  // send request to trigger notification with fetch request
  const { getToken } = await auth();
  const token = await getToken();

  const response = await fetch(
    "http://localhost:4000/api/requestAvailabilities",
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "POST"
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong while requesting availability");
  }

  // TODO: we need to create schedule

  redirect("/schedules/1");
};
