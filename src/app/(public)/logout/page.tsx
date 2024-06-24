"use client";
import { getApiCall } from "@/service/apiCall";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      try {
        const result = await getApiCall("/auth/logout");
        if (result?.status === 200) {
          localStorage.removeItem("jwt");
          toast.success("Logout successful");
          router.push("/login");
        }else{
          toast.error("Try again");
        }
      } catch (error) {
        toast.error("Try again");
      }
    };

    logout();
  }, [router]);

  return <></>;
};

export default Logout;
