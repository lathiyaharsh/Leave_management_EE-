"use client";
import React from "react";
import { getApiCall } from "@/service/apiCall";
import { useState, useEffect } from "react";
import { columns } from "./columns";
import { LeaveDetails } from "@/Utils/types";
import { DataTable } from "./data-table";
import LeaveChart from "./LeaveChart";
import Loading from "@/Components/Loading";
import StudentFacultyComponent from "./StudentFacultyDashboard";

function AdminComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<LeaveDetails[]>([]);
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
        <Loading />
      ) : (
        <>
        <StudentFacultyComponent />
          <div className="container mx-auto   py-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Leave Report
            </h1>
            <DataTable columns={columns} data={data} />
            <div className="container  mx-auto p-6 bg-gray-100 min-h-screen">
              <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Leave Report
              </h1>
              <div className="flex justify-center">

              <LeaveChart leaveData={data} />
              </div>
            </div>
          </div>

          
        </>
      )}
    </>
  );
}

export default AdminComponent;
