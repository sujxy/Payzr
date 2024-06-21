"use client";

import { useEffect, useState } from "react";
import GetUserBalance from "../app/lib/actions/getUserbalance";

const BalanceWidget = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getUserBalance = async () => {
      const balance = await GetUserBalance();
      setBalance(balance);
    };
    getUserBalance();
  }, []);

  return (
    <div className="col-span-1 bg-purple-1/90 text-purple-2 rounded-md shadow-md flex flex-col justify-center px-6 py-4">
      <p className="font-light text-sm">Your balance</p>
      <p className="font-semibold text-2xl">{`₹${balance}`}</p>
    </div>
  );
};

export default BalanceWidget;
