import { Card } from "@repo/ui/card";

const BalanceCard = ({
  balance,
  locked,
}: {
  balance: number;
  locked: number;
}) => {
  return (
    <Card title={"Balance"}>
      <div className="w-full border-b px-1 py-2  flex justify-between items-center">
        <p className="text-sm text-gray-500">Usable Balance</p>
        <p className="text-sm text-gray-700 font-semibold ">
          {"₹" + balance.toString()}
        </p>
      </div>
      <div className="w-full border-b px-1 py-2  flex justify-between items-center">
        <p className="text-sm text-gray-500">Locked Balance</p>
        <p className="text-sm text-gray-700 font-semibold ">
          {"₹" + locked.toString()}
        </p>
      </div>
      <div className="w-full mt-14 border-b px-1 py-2  flex justify-between items-center">
        <p className="text-sm text-gray-500">Total Balance</p>
        <p className="text-sm text-gray-700 font-semibold ">
          {"₹" + (balance + locked)}
        </p>
      </div>
    </Card>
  );
};

export default BalanceCard;
