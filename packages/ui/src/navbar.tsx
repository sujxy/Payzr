"use client";
import { Button } from "./button";

interface NavbarProps {
  user?: {
    name?: string | null;
  };
  onSignIn: () => Promise<undefined>;
  onSignOut: () => Promise<undefined>;
}

export const Navbar = ({ user, onSignIn, onSignOut }: NavbarProps) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 w-full bg-purple-2 border absolute top-0 z-10">
      <span className="text-2xl font-black text-purple-1 italic ">Payzr</span>
      <span>
        <Button
          onClick={user ? onSignOut : onSignIn}
          label={user ? "signout" : "signin"}
        />
      </span>
    </div>
  );
};
