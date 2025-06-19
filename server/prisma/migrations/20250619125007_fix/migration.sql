/*
  Warnings:

  - A unique constraint covering the columns `[objectKey]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `objectKey` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "objectKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Document_objectKey_key" ON "Document"("objectKey");
