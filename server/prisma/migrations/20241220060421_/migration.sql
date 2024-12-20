/*
  Warnings:

  - The primary key for the `employee_availability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `employee_availability` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `employee_availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `employee_availability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_availability" DROP CONSTRAINT "employee_availability_pkey",
DROP COLUMN "id",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;
