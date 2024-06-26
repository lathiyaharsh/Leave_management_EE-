"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useUserContext } from "../context/userContext";
import NavBar from "@/Components/Navbar";

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
        <>
          <div className="top-nav-spacer"></div>
          <NavBar />
          <div className="side-bar-spacer sm:ms-60"><div className="sm:ms-4">{children}</div></div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </>
  );
}
