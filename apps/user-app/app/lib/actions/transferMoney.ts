"use server";
import client from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function MoneyTransfer(amount: number, phone: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) throw new Error("No logged in user found !");

  const recipient = await client.user.findFirst({
    where: { phone: phone },
  });
  if (!recipient) {
    throw new Error(`Recipient not found for phone: ${phone}`);
  }

  try {
    await client.$transaction([
      client.account.update({
        where: {
          userId: session.user.id,
        },
        data: {
          balance: { decrement: Number(amount) * 100 },
        },
      }),
      client.account.update({
        where: {
          userId: recipient.id,
        },
        data: {
          balance: { increment: Number(amount) * 100 },
        },
      }),
      client.p2PTransactions.create({
        data: {
          senderId: session.user.id,
          receiverId: String(recipient.id),
          type: "debit",
          status: "Success",
          startTime: new Date(),
          amount: Number(amount) * 100,
        },
      }),
    ]);

    return { message: "success" };
  } catch (e: any) {
    console.log("cannot transfer money : ", e);
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
