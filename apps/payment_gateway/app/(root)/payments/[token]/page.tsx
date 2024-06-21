import Image from "next/image";

export default function Page({
  params,
}: {
  params: { token: string };
}): JSX.Element {
  const date = new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="w-screen h-screen flex  items-start py-10 justify-center ">
      <div className="w-3/4 rounded-md shadow border grid grid-cols-2 h-[480px]">
        <div className="h-full col-span-1 flex flex-col p-2">
          <div className="bg-slate-700 text-white font-bold text-center py-2 ">
            SPOOF NATIONAL BANK
          </div>
          <div className="border py-1 text-gray-500 text-center text-sm">
            {date}
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
