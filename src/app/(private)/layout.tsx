"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useUserContext } from "../context/userContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user] = useUserContext();
  return (
    <>
      {user ? (
        <>{children}</>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </>
  );
}
