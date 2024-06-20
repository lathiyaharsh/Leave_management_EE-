"use client";
import { getApiCall } from "@/Utils/apiCall";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useState, useEffect } from "react";
import Loading from "@/Components/Loading";


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
        <Loading />
      ) : (
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
}
