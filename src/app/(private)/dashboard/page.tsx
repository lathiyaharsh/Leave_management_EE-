"use client";
import NavBar from "@/Components/Navbar";
import { useUserContext } from "@/app/context/userContext";
import React from "react";
import { toast } from "react-toastify";
function Dashboard() {
  const [user] = useUserContext();

  return (
    <>
      <div className=""> dashboard{user?.name}</div>
    </>
  );
}

export default Dashboard;
