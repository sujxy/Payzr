"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import client from "@repo/db/client";
import axios from "axios";

export async function OnRampTransaction(amount: number, provider: string) {
  //get logged in user information
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  if (!userId) {
    return { error: "user not logged in !" };
  }
  //negotiaite with bank server for a token for this transaction
  const { data } = await axios.post("http://localhost:3000/api/token", {
    userId: userId,
    amount: (Number(amount) * 100).toString(),
  });
  if (data.error) return { error: "failed to negotitate with bank!" };
  //craete onRampTransaction in database
  try {
    await client.onRampTransactions.create({
      data: {
        userId: userId,
        startTime: new Date(),
        amount: Number(amount) * 100,
        provider: provider,
        status: "Processing",
        token: data.token,
        type: "credit",
      },
    });

    console.log("created");
    return {
      message: "transaction added !",
      token: data.token,
    };
  } catch (e: any) {
    console.log("error", e);
    return {
      error: "transactionn could'nt be added !",
    };
  }
}
