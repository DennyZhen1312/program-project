/*
  Warnings:

  - The primary key for the `user_schedules` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "user_schedules" DROP CONSTRAINT "user_schedules_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_schedules_pkey" PRIMARY KEY ("id");
