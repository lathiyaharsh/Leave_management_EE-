"use client";
import { getApiCall } from "@/Utils/apiCall";
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
  }, []);

  return <></>;
};

export default Logout;
