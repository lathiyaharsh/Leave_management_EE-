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
import { StoreProvider } from "../../StoreProvider";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/navigation";
export const UserFetcher = () => {
  try {
    const [, setUser] = useUserContext();
    const router = useRouter();
    const getApi = async () => {
      try {
        const result = await fetchUser();
        setUser(result);
      } catch (error) {
        router.push("/logout");
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StoreProvider>
        <RoleContextProvider>
          <UserContextProvider>
            <UserFetcher />
            <html lang="en">
              <body className={inter.className}>
                <NavBar />
                <div className="top-nav-spacer"></div>
                <div className="side-bar-spacer sm:ms-60"><div className="sm:ms-4">{children}</div></div>
                <ToastContainer />
              </body>
            </html>
          </UserContextProvider>
        </RoleContextProvider>
      </StoreProvider>
    </>
  );
}
