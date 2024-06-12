"use client";
import { Inter } from "next/font/google";

import {
  ModelContext,
  UserContextProvider,
  useUserContext,
} from "@/app/context/userContext";
import {
  RoleContext,
  RoleContextProvider,
  useRoleContext,
} from "@/app/context/userRole";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import fetchUser from "@/Utils/getUserDetails";
import NavBar from "@/Components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const UserFetcher = () => {
  try {
    const [, setUser] = useUserContext();

  const getApi = async () => {
    try {
      const result = await fetchUser();
      setUser(result);
    } catch (error) {
      console.error("Error fetching user Role:", error);
    } 
  };

  useEffect(() => {
    getApi();
  }, []);

  return null;
  } catch (error) {
    console.log(error);
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RoleContextProvider>
        <UserContextProvider>
          <UserFetcher />
          <html lang="en">
            <body className={inter.className}>
              <NavBar />
              <div className="top-nav-spacer"></div>
              <>{children}</>
              <ToastContainer />
            </body>
          </html>
        </UserContextProvider>
      </RoleContextProvider>
    </>
  );
}
