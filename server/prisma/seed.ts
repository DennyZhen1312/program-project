import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { clerkClient } from "../src/clerk/client";

const prisma = new PrismaClient();

async function main() {
  const clerkUsers = await clerkClient.users.getUserList();

  const users = await prisma.employee.createMany({
    data: clerkUsers.data.map((user) => ({
      name: user.fullName || "",
      email: user.primaryEmailAddress?.emailAddress || "",
      isAvailabilityRequested: false
    }))
  });
  console.log(`${users.count} data created successfully!`);

  const shifts = await prisma.shift.createMany({
    data: [
      { name: "9 to 2", startTime: "09:00", endTime: "14:00" },
      { name: "11 to 5", startTime: "11:00", endTime: "17:00" },
      { name: "5 to 11", startTime: "17:00", endTime: "23:00" },
      { name: "5 to 12", startTime: "17:00", endTime: "24:00" }
    ]
  });
  console.log(`${shifts.count} shift data created successfully!`);

  const stations = await prisma.station.createMany({
    data: [
      { name: "Noodle", description: "station to cook noodle" },
      { name: "Broth", description: "station to cook broth" },
      { name: "Egg", description: "station to cook egg" },
      { name: "Meat", description: "station to cook meat" },
      { name: "Tempura", description: "station to cook tempura" },
      { name: "Veggie", description: "station to cook veggies" },
      { name: "Counter", description: "station to manage orders and payment" }
    ]
  });

  console.log(`${stations.count} station data created successfully!`);

  const schedule = await prisma.schedule.create({
    data: {
      startDate: moment().weekday(0).toDate(),
      endDate: moment()
        .weekday(0 + 7)
        .toDate(),
      userSchedules: {
        createMany: {
          data: [
            {
              employeeId: 1,
              startTime: moment().weekday(0).hour(0).toDate(),
              endTime: moment().weekday(0).hour(2).toDate()
            }
          ]
        }
      }
    },
    include: {
      userSchedules: true
    }
  });

  console.log(JSON.stringify(schedule));
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

("\nInvalid `prisma.employee.createMany()` invocation in\n/Users/bart/Desktop/program-project/server/prisma/seed.ts:7:39\n\n  4 async function main() {\n  5   const clerkUsers = await clerkClient.users.getUserList();\n  6 \n→ 7   const users = await prisma.employee.createMany(\nThe table `public.Employee` does not exist in the current database.");
