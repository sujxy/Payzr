"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { OnRampTransaction } from "../app/lib/actions/onRampTransactions";

const bankProviders = [
  {
    name: "HDFC Bank",
    redirectURL: "http://localhost:3000/payments/hdfc",
  },
  {
    name: "Axis Bank",
    redirectURL: "http://localhost:3000/payments/axis",
  },
  {
    name: "IDFC Bank",
    redirectURL: "http://localhost:3000/payments/idfc",
  },
];

const AddMoney = () => {
  const [amount, setAmount] = useState<string>("0");
  const [provider, setProvider] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const createTransaction = async () => {
    setLoading(true);
    const newTransaction = await OnRampTransaction(Number(amount), provider);
    if (newTransaction.message) {
      alert("transaction created!");
      window.location.href =
        bankProviders.find((ele) => ele.name == provider)?.redirectURL +
          `/${newTransaction.token}` || "";
    } else alert("transaction failed!");
    setLoading(false);
  };

  return (
    <Card title={"Add Money"}>
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
        label={loading ? "processing" : "Add Money"}
        onClick={createTransaction}
      ></Button>
    </Card>
  );
};

export default AddMoney;
