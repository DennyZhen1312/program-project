-- DropIndex
DROP INDEX "employee_availability_employee_id_availability_id_key";

-- AlterTable
ALTER TABLE "employee_availability" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "employee_availability_pkey" PRIMARY KEY ("id");
