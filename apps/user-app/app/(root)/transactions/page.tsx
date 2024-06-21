import client from "@repo/db/client";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import TransactionCard from "../../../components/tranactionCard";
import SendMoney from "../../../components/sendMoney";

const getTransactions = async () => {
  const session = await getServerSession(authOptions);
  const transactions = await client.p2PTransactions.findMany({
    select: {
      type: true,
      amount: true,
      startTime: true,
      status: true,
      receiverId: true,
      senderId: true,
    },
    where: {
      OR: [{ senderId: session?.user?.id }, { receiverId: session?.user?.id }],
    },
    orderBy: {
      startTime: "desc",
    },
  });
  return transactions;
};

export default async function Page() {
  const recentTransactions = await getTransactions();

  return (
    <div className="  flex flex-col ">
      <h1 className="font-bold  text-2xl text-purple-1">Transactions</h1>
      <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-4 my-4 ">
        <SendMoney />
        <TransactionCard transactions={recentTransactions} />
      </div>
    </div>
  );
}
