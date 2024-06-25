"use server";
import client from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function MoneyTransfer(amount: number, phone: string) {
  console.log("transfer begins...");
  const session = await getServerSession(authOptions);
  if (!session || !session.user) throw new Error("No logged in user found !");

  const recipient = await client.user.findFirst({
    where: { phone: phone },
  });
  if (!recipient) {
    throw new Error(`Recipient not found for phone: ${phone}`);
  }

  try {
    await client.$transaction(async (txn) => {
      //lock the row where update needs needs to be done
      console.log("locking row..");
      await txn.$queryRaw`SELECT * FROM "Account" WHERE "userId" = ${recipient.id} FOR UPDATE`;

      const userBalance = await txn.account.findUnique({
        where: {
          userId: session.user.id,
        },
      });
      console.log("checking balance..");
      if (!userBalance || userBalance.balance < Number(amount) * 100)
        throw new Error("Insufficient balance !");

      console.log("decrementing user balance..");
      await txn.account.update({
        where: {
          userId: session.user.id,
        },
        data: {
          balance: { decrement: Number(amount) * 100 },
        },
      });
      console.log("upating user2 balance...");
      await txn.account.update({
        where: {
          userId: recipient.id,
        },
        data: {
          balance: { increment: Number(amount) * 100 },
        },
      });
      console.log("creating transcation record...");
      await txn.p2PTransactions.create({
        data: {
          senderId: session.user.id,
          receiverId: String(recipient.id),
          type: "debit",
          status: "Success",
          startTime: new Date(),
          amount: Number(amount) * 100,
        },
      });
    });
    console.log("transfer success!");
    return { message: "success" };
  } catch (e: any) {
    console.log("cannot transfer money : ", e);
    console.log("transfer fail!");
    await client.p2PTransactions.create({
      data: {
        senderId: session.user.id,
        receiverId: String(recipient.id),
        type: "debit",
        status: "Failure",
        startTime: new Date(),
        amount: Number(amount) * 100,
      },
    });
    return { error: "Error transfering money !" };
  }
}
