import { HandCoins, History, Home } from "lucide-react";

export const sidebarOptions = [
  {
    icon: <Home size={22} />,
    label: "Home",
    link: "/",
  },
  {
    icon: <HandCoins size={22} />,
    label: "Transfer",
    link: "/transfer",
  },
  {
    icon: <History size={22} />,
    label: "Transactions",
    link: "/transactions",
  },
];
