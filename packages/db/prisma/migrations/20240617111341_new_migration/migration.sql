/*
  Warnings:

  - The values [credit,debit] on the enum `P2Pstatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Success,Failure,Processing] on the enum `P2Ptype` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "P2Pstatus_new" AS ENUM ('Success', 'Failure', 'Processing');
ALTER TABLE "P2PTransactions" ALTER COLUMN "status" TYPE "P2Pstatus_new" USING ("status"::text::"P2Pstatus_new");
ALTER TYPE "P2Pstatus" RENAME TO "P2Pstatus_old";
ALTER TYPE "P2Pstatus_new" RENAME TO "P2Pstatus";
DROP TYPE "P2Pstatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "P2Ptype_new" AS ENUM ('credit', 'debit');
ALTER TABLE "P2PTransactions" ALTER COLUMN "type" TYPE "P2Ptype_new" USING ("type"::text::"P2Ptype_new");
ALTER TYPE "P2Ptype" RENAME TO "P2Ptype_old";
ALTER TYPE "P2Ptype_new" RENAME TO "P2Ptype";
DROP TYPE "P2Ptype_old";
COMMIT;
