"use client";
import Link from "next/link";
import { sidebarOptions } from "../utils/sidebarOptions";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const path = usePathname();

  return (
    <div className="w-2/12 max-md:w-fit max-sm:absolute max-sm:bottom-0  max-sm:w-full px-2 flex sm:flex-col shadow-md items-start border justify-start max-sm:py-2 sm:pt-24 max-sm:backdrop-blur-md max-md:bg-purple-2 ">
      {sidebarOptions.map((option, i) => {
        const isSelected =
          path == option.link || path.startsWith(`${option.link}/`);
        return (
          <Link
            key={i}
            href={option.link}
            className={`flex items-center gap-2 w-full  px-4 rounded-md py-2 hover:bg-purple-1/10 justify-start  ${isSelected ? "text-purple-1 font-semibold hover:bg-purple-2" : "text-gray-500"}`}
          >
            {option.icon}
            <h2 className="text-lg max-md:hidden ">{option.label}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
