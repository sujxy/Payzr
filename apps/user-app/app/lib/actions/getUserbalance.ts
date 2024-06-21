"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import client from "@repo/db/client";

export default async function GetUserBalance() {
  const session = await getServerSession(authOptions);
  const account = await client.account.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });
  if (account) return account?.balance / 100;
  return 0;
}
