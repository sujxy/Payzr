/*
  Warnings:

  - You are about to drop the column `provider` on the `P2PTransactions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `P2PTransactions` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `P2PTransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `P2PTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "P2PTransactions" DROP CONSTRAINT "P2PTransactions_userId_fkey";

-- AlterTable
ALTER TABLE "P2PTransactions" DROP COLUMN "provider",
DROP COLUMN "userId",
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "P2PTransactions" ADD CONSTRAINT "P2PTransactions_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransactions" ADD CONSTRAINT "P2PTransactions_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
