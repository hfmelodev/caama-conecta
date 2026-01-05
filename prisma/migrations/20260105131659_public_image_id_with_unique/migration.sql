/*
  Warnings:

  - A unique constraint covering the columns `[public_image_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "companies_public_image_id_key" ON "companies"("public_image_id");
