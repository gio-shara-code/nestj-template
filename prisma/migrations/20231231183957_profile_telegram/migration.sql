-- CreateTable
CREATE TABLE "profiles"."telegram" (
    "id" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "username" TEXT,
    "photoUrl" TEXT,
    "profileBaseId" TEXT,

    CONSTRAINT "telegram_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profiles"."telegram" ADD CONSTRAINT "telegram_profileBaseId_fkey" FOREIGN KEY ("profileBaseId") REFERENCES "profiles"."base"("id") ON DELETE SET NULL ON UPDATE CASCADE;
