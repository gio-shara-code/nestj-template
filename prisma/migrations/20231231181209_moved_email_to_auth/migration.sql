/*
  Warnings:

  - You are about to drop the column `email` on the `base` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `base` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "profiles"."base_email_key";

-- AlterTable
ALTER TABLE "auth"."base" ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "profiles"."base" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "base_email_key" ON "auth"."base"("email");
