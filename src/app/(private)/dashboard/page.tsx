"use client";
import { useUserContext } from "@/app/context/userContext";
import React from "react";
function Dashboard() {
  const [user] = useUserContext();

  return (
    <>
      <div className=""> dashboard{user?.name}</div>
    </>
  );
}

export default Dashboard;
