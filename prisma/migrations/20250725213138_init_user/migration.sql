-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "idClerk" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "lastName" TEXT,
    "firstName" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_idClerk_key" ON "User"("idClerk");
