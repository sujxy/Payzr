import client from "@repo/db/client";
import AddMoney from "../../../components/addMoney";
import BalanceCard from "../../../components/balanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import TransactionCard from "../../../components/tranactionCard";

const getTransactions = async () => {
  const session = await getServerSession(authOptions);
  if (!session.user) return [];
  const transactions = await client.onRampTransactions.findMany({
    select: {
      type: true,
      amount: true,
      provider: true,
      startTime: true,
      status: true,
    },
    where: {
      userId: session.user.id,
    },
    orderBy: {
      startTime: "desc",
    },
  });
  return transactions;
};

const getUserBalance = async () => {
  const session = await getServerSession(authOptions);
  const account = await client.account.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });
  if (account)
    return {
      balance: account?.balance / 100 || 0,
      locked: account?.locked / 100 || 0,
    };
};

export default async function Page() {
  const recentTransactions = await getTransactions();
  const currentBalance = await getUserBalance();
  if (!recentTransactions || !currentBalance) return "loading..";
  return (
    <div className="  flex flex-col ">
      <h1 className="font-bold  text-2xl text-purple-1">Transfer</h1>
      <div className="w-full grid grid-cols-2 max-md:grid-cols-1 gap-4 my-4 ">
        <AddMoney />
        <BalanceCard
          balance={currentBalance.balance}
          locked={currentBalance.locked}
        />
        <TransactionCard transactions={recentTransactions} />
      </div>
    </div>
  );
}
