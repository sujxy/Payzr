"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@repo/ui/loader";
import BalanceWidget from "../../components/balanceWidget";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status == "loading") return <Loader />;
  if (!session) {
    router.push("/api/auth/signin");
    return null;
  }

  return (
    <div className="  flex flex-col ">
      <h1 className="font-bold  text-2xl text-purple-1">
        {`Hello,${session?.user?.name}`}{" "}
      </h1>
      <div className="w-full grid grid-cols-3 max-md:grid-cols-1 gap-4 my-4 ">
        <BalanceWidget />
      </div>
    </div>
  );
}
