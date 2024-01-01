-- CreateTable
CREATE TABLE "auth"."invitation_code" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "telegramId" INTEGER NOT NULL,

    CONSTRAINT "invitation_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invitation_code_code_key" ON "auth"."invitation_code"("code");

-- AddForeignKey
ALTER TABLE "auth"."invitation_code" ADD CONSTRAINT "invitation_code_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "profiles"."telegram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
