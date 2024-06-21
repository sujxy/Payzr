import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "../providers/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Payzr",
  description: "Payments & Wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
