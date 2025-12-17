/*
  Warnings:

  - You are about to drop the column `website` on the `companies` table. All the data in the column will be lost.
  - Added the required column `instagram` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `neighborhood` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zip_code` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discount` on table `companies` required. This step will fail if there are existing NULL values in that column.
  - Made the column `benefits` on table `companies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "website",
ADD COLUMN     "instagram" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "neighborhood" SET NOT NULL,
ALTER COLUMN "zip_code" SET NOT NULL,
ALTER COLUMN "discount" SET NOT NULL,
ALTER COLUMN "discount" SET DATA TYPE TEXT,
ALTER COLUMN "benefits" SET NOT NULL;
