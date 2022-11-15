/*
  Warnings:

  - The values [CLOSED] on the enum `WorkSessionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WorkSessionStatus_new" AS ENUM ('IN_PROGRESS', 'ENDED');
ALTER TABLE "WorkSession" ALTER COLUMN "status" TYPE "WorkSessionStatus_new" USING ("status"::text::"WorkSessionStatus_new");
ALTER TYPE "WorkSessionStatus" RENAME TO "WorkSessionStatus_old";
ALTER TYPE "WorkSessionStatus_new" RENAME TO "WorkSessionStatus";
DROP TYPE "WorkSessionStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "WorkSession" ADD COLUMN     "income" DECIMAL(65,30),
ALTER COLUMN "elapsedTime" DROP NOT NULL;
