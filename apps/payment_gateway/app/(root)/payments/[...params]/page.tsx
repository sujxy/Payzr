"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DecodeJWT from "../../../actions/decodeJwt";
import axios from "axios";

export default function Page() {
  const date = new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const completeTransaction = async () => {
    setLoading(true);
    const { data } = await axios.post(`http://localhost:3003/hdfcWebhook`, {
      token,
      userId,
      amount,
    });
    if (data.message) {
      setLoading(false);
      alert("payment success!");
      window.location.href = "http://localhost:3001/transfer";
    }
  };
  useEffect(() => {
    const getTokenData = async () => {
      const payload = await DecodeJWT(params?.params[1]);
      if (payload) {
        setToken(params?.params[1]);
        setAmount(payload.amount);
        setUserId(payload.userId);
      }
    };
    getTokenData();
  }, []);
  return (
    <div className="w-screen h-screen flex  items-start py-10 justify-center ">
      <div className="w-3/4 rounded-md shadow border grid grid-cols-2 h-[480px]">
        <div className="h-full col-span-1 flex flex-col justify-evenly p-2">
          <div className="bg-slate-700 text-white font-bold text-center py-2 ">
            SPOOF NATIONAL BANK
          </div>
          <div className="border py-1 text-gray-500 text-center text-sm">
            {date}
          </div>
          <div className="border py-1 text-gray-500 text-sm">
            <b>Provider : </b> <span>{params?.params[0]?.toUpperCase()}</span>
          </div>
          <div className="border py-1 text-gray-500 text-sm">
            <b>Paying amount of rupees : </b> <span>{amount}</span>
          </div>
          <div className="w-1/2 mx-auto border rounded-md p-2 flex flex-col gap-2">
            <div className="border py-1 text-gray-500  text-sm">
              <b>User ID : </b> <p>{userId}</p>
            </div>
            <div className="border py-1 text-gray-500  text-sm">
              <b>Password : </b>{" "}
              <input
                type="text"
                placeholder="type anything.."
                className="ring-0  w-full outline-none p-1 border border-gray-500"
              />
            </div>
            <button
              disabled={loading}
              onClick={completeTransaction}
              className="bg-gray-700 w-full py-2 text-center text-white text-lg font-semibold rounded-md"
            >
              {loading ? "processing" : "confirm"}
            </button>
          </div>

          <div className="border py-1 text-gray-500  text-xs">
            A Terms and Conditions agreement acts as a legal contract between
            you (the company) and the user. It's where you maintain your rights
            to exclude users from your app in the event that they abuse your
            website/app, set out the rules for using your service and note other
            important details and disclaimers. Having a Terms and Conditions
            agreement is completely optional. No laws require you to have one.
          </div>
        </div>
        <div className="h-full col-span-1 object-cover overflow-hidden">
          <Image
            src={"/banner.jpg"}
            className="w-full h-full col-span-1 "
            width={200}
            height={250}
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
}
