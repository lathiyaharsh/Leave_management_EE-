"use client";
import { getApiCall } from "@/Utils/apiCall";
import { useUserContext } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const [,setUser] = useUserContext();
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      setUser(null);
      try {
        const result = await getApiCall("/auth/logout");
        if (result?.status === 200) {
          toast.success("Logout successful");
          router.push('/login')  
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
