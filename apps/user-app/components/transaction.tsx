import { CircleCheckBig, CircleX, Clock } from "lucide-react";
import client from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

const getOriginator = async (
  senderId: string | undefined,
  receiverId: string | undefined,
) => {
  if (!receiverId) return undefined;
  if (!senderId) return undefined;
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  const originatorId = userId == senderId ? receiverId : senderId;
  const type = userId == senderId ? "debit" : "credit";
  const originator = await client.user.findFirst({
    where: {
      id: originatorId,
    },
    select: {
      name: true,
    },
  });
  return { name: originator?.name, type: type };
};

const Transaction = async ({
  type,
  amount,
  vendor,
  time,
  senderId,
  receiverId,
  status,
}: {
  status: string;
  type: string;
  vendor?: string;
  receiverId?: string;
  senderId?: string;
  amount: number;
  time: Date;
}) => {
  const receiver = await getOriginator(senderId, receiverId);

  const date = new Date(time).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="w-full flex items-center justify-between px-1 py-2 border-b">
      <div className="flex gap-3 items-center ">
        <div
          className={`center-div p-2 rounded-full ${status === "Failure" && "bg-red-50 text-red-500 "} ${status === "Processing" && " bg-yellow-50 text-yellow-600"} ${status == "Success" && "bg-green-50 text-green-600"}`}
        >
          {status == "Failure" && <CircleX size={26} />}
          {status == "Success" && <CircleCheckBig size={26} />}
          {status == "Processing" && <Clock size={26} />}
        </div>
        <div>
          <p className="text-sm font-semibold ">
            {" "}
            {vendor ? vendor : receiver?.name}
          </p>
          <p className="text-sm font-normal text-gray-500"> {date}</p>
        </div>
      </div>
      {vendor ? (
        <h3
          className={`text-lg font-semibold ${type == "credit" && "text-green-500"} ${type == "debit" && "text-red-500"}`}
        >
          {type == "credit" && "+"}
          {type == "debit" && "-"}
          {"₹" + amount / 100}
        </h3>
      ) : (
        <h3
          className={`text-lg font-semibold ${receiver?.type == "credit" && "text-green-500"} ${receiver?.type == "debit" && "text-red-500"}`}
        >
          {receiver?.type == "credit" && "+"}
          {receiver?.type == "debit" && "-"}
          {"₹" + amount / 100}
        </h3>
      )}
    </div>
  );
};

export default Transaction;
