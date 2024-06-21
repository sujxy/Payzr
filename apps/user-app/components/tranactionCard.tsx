import { Card } from "@repo/ui/card";
import Transaction from "./transaction";

const TransactionCard = ({
  transactions,
}: {
  transactions: {
    status: string;
    type: string;
    provider?: string;
    receiverId?: string;
    senderId?: string;
    amount: number;
    startTime: Date;
  }[];
}) => {
  return (
    <Card title={"Recents"}>
      {transactions.length
        ? transactions.map((t, i) => {
            return (
              <Transaction
                key={i}
                type={t.type}
                status={t.status}
                vendor={t.provider}
                receiverId={t.receiverId}
                senderId={t.senderId}
                amount={t.amount}
                time={t.startTime}
              />
            );
          })
        : "No Transactions"}
    </Card>
  );
};

export default TransactionCard;
