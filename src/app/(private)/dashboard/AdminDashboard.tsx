"use client";
import React from "react";
import { getApiCall } from "@/Utils/apiCall";
import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import LeaveChart from "./LeaveChart";

function AdminComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const result = await getApiCall("/leave/leaveReport");
        if (result?.data?.leaveReport) {
          setData(result?.data?.leaveReport);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
            <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
              <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Leave Report
              </h1>
              <LeaveChart leaveData={data} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminComponent;