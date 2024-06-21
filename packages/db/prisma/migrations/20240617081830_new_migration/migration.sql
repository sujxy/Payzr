-- CreateEnum
CREATE TYPE "P2Ptype" AS ENUM ('Success', 'Failure', 'Processing');

-- CreateEnum
CREATE TYPE "P2Pstatus" AS ENUM ('credit', 'debit');

-- CreateTable
CREATE TABLE "P2PTransactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "P2Pstatus" NOT NULL,
    "provider" TEXT NOT NULL,
    "type" "P2Ptype" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "P2PTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "P2PTransactions_id_key" ON "P2PTransactions"("id");

-- AddForeignKey
ALTER TABLE "P2PTransactions" ADD CONSTRAINT "P2PTransactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
