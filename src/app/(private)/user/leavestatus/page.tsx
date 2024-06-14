"use client";
import { getApiCall } from "@/Utils/apiCall";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { useState, useEffect } from "react";

function getData(): Promise<Payment[]> {
  // const leavestatus = await getApiCall('/leave/userLeaveStatus');
  // console.log(leavestatus);

  // Fetch data from your API here.
  return [
    {
      id: 45,
      userId: 59,
      startDate: "2024-06-13",
      endDate: "2024-06-16",
      requestToId: 2,
      leaveType: "First half",
      reason: "personal",
      status: "Approved",
      roleId: 4,
      createdAt: "2024-06-11T08:40:57.000Z",
      requestedTo: {
        name: "bhargav",
        email: "harshlathiyawork@gmail.com",
      },
    },
    // ...
  ];
}

export default function DemoPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const result = await getApiCall("/leave/userLeaveStatus");
        if (result?.data?.leaveStatus) {
          setData(result?.data?.leaveStatus);
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
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
}
