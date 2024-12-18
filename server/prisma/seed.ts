import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const users = [
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      isAvailabilityRequested: false,
    },
    {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      isAvailabilityRequested: false,
    },
    {
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      isAvailabilityRequested: false,
    },
    {
      name: "Diana Prince",
      email: "diana.prince@example.com",
      isAvailabilityRequested: false,
    },
    {
      name: "Ethan Hunt",
      email: "ethan.hunt@example.com",
      isAvailabilityRequested: false,
    },
  ];
  await prisma.user.createMany({
    data: users,
  });
  console.log("Seed data created successfully!");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
