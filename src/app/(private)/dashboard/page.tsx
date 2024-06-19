"use client";
import { useUserContext } from "@/app/context/userContext";
import React from "react";
import AdminComponent from "./AdminDashboard";
import FacultyComponent from "./FacultyDashboard";
import StudentComponent from "./StudentDashboard";
function Dashboard() {
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
      return <FacultyComponent />;
    case "student":
      return <StudentComponent />;
    default:
      return <p>Access denied</p>;
  }
}

export default Dashboard;
