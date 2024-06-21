"use client";

import { Navbar } from "@repo/ui/navbar";
import { signIn, signOut, useSession } from "next-auth/react";
import SideBar from "../../components/sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const session = useSession();

  return (
    <div className="h-screen w-full">
      <Navbar
        user={session?.data?.user}
        onSignIn={signIn}
        onSignOut={signOut}
      />

      <div className=" flex h-screen w-full ">
        <SideBar />
        <div className="flex-1 w-10/12 pt-24 px-12  overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
