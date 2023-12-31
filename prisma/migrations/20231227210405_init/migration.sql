-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "profiles";

-- CreateEnum
CREATE TYPE "auth"."AuthenticationMethod" AS ENUM ('EMAIL', 'TELEGRAM');

-- CreateTable
CREATE TABLE "auth"."base" (
    "id" TEXT NOT NULL,
    "password" TEXT,
    "authenticationMethod" "auth"."AuthenticationMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles"."base" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "base_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "base_email_key" ON "profiles"."base"("email");

-- AddForeignKey
ALTER TABLE "profiles"."base" ADD CONSTRAINT "base_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
