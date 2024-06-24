"use client";
import { useUserContext } from "@/app/context/userContext";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminComponent from "./AdminDashboard";
import StudentFacultyComponent from "./StudentFacultyDashboard";
import fetchUser from "@/service/getUserDetails";

function Dashboard() {
  const router = useRouter();
  const [, setUser] = useUserContext();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const getApi = async () => {
      try {
        const result = await fetchUser();
        setUser(result);
      } catch (error) {
        console.error("Error fetching user Role:", error);
      }
    };
    if (token) {
      localStorage.setItem("jwt", token);
      getApi();
    }
  }, [router, setUser]);
  const [user] = useUserContext();
  const role: any = user?.user;
  if (!role) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </>
    );
  }

  switch (role) {
    case "admin":
      return <AdminComponent />;
    case "faculty":
      return <StudentFacultyComponent />;
    case "student":
      return <StudentFacultyComponent />;
    default:
      return <p>Access denied</p>;
  }
}

export default Dashboard;
