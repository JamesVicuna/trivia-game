import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { StoreProvider } from "./redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trivia Game",
  description: "Made with love by James Vicuna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-col justify-center items-center h-screen text-center">{children}</div>
        </body>
      </html>
    </StoreProvider>
  );
}
