"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import client from "@repo/db/client";

export async function OnRampTransaction(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  const token = crypto.randomUUID().toString();
  if (!userId) {
    return { message: "user not logegd in !" };
  }
  try {
    await client.onRampTransactions.create({
      data: {
        userId: userId,
        startTime: new Date(),
        amount: Number(amount) * 100,
        provider: provider,
        status: "Processing",
        token: token,
        type: "credit",
      },
    });

    console.log("created");
    return {
      message: "transaction added !",
    };
  } catch (e: any) {
    console.log("error", e);
    return {
      error: "transactionn could'nt be added !",
    };
  }
}
