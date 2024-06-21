"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { OnRampTransaction } from "../app/lib/actions/onRampTransactions";

const bankProviders = [
  {
    name: "HDFC Bank",
    redirectURL: "hdfc.com",
  },
  {
    name: "Axis Bank",
    redirectURL: "axis.com",
  },
  {
    name: "IDFC First Bank",
    redirectURL: "idfc.com",
  },
];

const AddMoney = () => {
  const [amount, setAmount] = useState<number>(0);
  const [provider, setProvider] = useState<string>("Bank Service");

  const createTransaction = async () => {
    const newTransaction = await OnRampTransaction(amount, provider);
    if (newTransaction.message) {
      alert("transaction created!");
      window.location.href =
        bankProviders.find((ele) => ele.name === provider)?.redirectURL || "";
    } else alert("transaction failed!");
  };

  return (
    <Card title={"Add Money"}>
      <label className="w-full">
        <p className="font-semibold text-xs text-gray-600 my-2">Amount</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border border-gray-500 outline-none ring-0 px-2 py-1 rounded-md"
        />
      </label>

      <label className="w-full">
        <p className="font-semibold text-xs text-gray-600 my-2">Bank</p>
        <select
          onChange={(e) => setProvider(e.target.value)}
          value={provider}
          className="w-full border border-gray-500 bg-gray-50 outline-none ring-0 px-2 py-1 rounded-md"
        >
          {bankProviders.map((provider, i) => (
            <option key={i} value={provider.name}>
              {provider.name}
            </option>
          ))}
        </select>
      </label>

      <Button
        className=" mt-3 bg-gray-800 hover:bg-gray-600 w-[140px]"
        label="Add Money"
        onClick={createTransaction}
      ></Button>
    </Card>
  );
};

export default AddMoney;
