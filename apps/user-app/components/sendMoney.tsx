"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { MoneyTransfer } from "../app/lib/actions/transferMoney";

const SendMoney = () => {
  const [amount, setAmount] = useState<string>("0");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const transferMoney = async () => {
    setLoading(true);
    const newTransaction = await MoneyTransfer(Number(amount), phone);
    if (newTransaction.message) {
      setLoading(false);
      alert("sent!");
    } else {
      setLoading(false);
      alert("Retry!");
    }
  };

  return (
    <Card title={"Send Money"}>
      <label className="w-full">
        <p className="font-semibold text-xs text-gray-600 my-2">Amount</p>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-500 outline-none ring-0 px-2 py-1 rounded-md"
        />
      </label>

      <label className="w-full">
        <p className="font-semibold text-xs text-gray-600 my-2">Phone</p>
        <input
          type="text"
          value={phone}
          placeholder="909087123"
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-500 outline-none ring-0 px-2 py-1 rounded-md"
        />
      </label>

      <Button
        className=" mt-3 bg-gray-800 hover:bg-gray-600 w-full"
        label={loading ? "procesing" : "Send Money"}
        onClick={transferMoney}
      ></Button>
    </Card>
  );
};

export default SendMoney;
