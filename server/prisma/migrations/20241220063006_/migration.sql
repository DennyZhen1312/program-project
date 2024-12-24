/*
  Warnings:

  - Added the required column `id` to the `employee_availability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_availability" ADD COLUMN     "id" INTEGER NOT NULL;
