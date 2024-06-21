"use client";
import { getApiCall } from "@/Utils/apiCall";
import { useState, useEffect } from "react";
import { getColumns } from "./columns";
import { DataTable } from "@/Components/DataTable/data-table";
import Loading from "@/Components/Loading";
import { SortType, User } from "@/Utils/types";
import Pagination from "@/Components/DataTable/Pagination";
export default function DemoPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [reloadData, setReloadData] = useState(false);
  const [query, setQuery] = useState("");
  const [getSorting, setGetSorting] = useState("");

  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const searchQuery: string = `search=${encodeURIComponent(query)}`;
        const sorting: any = getSorting;
        const sortParams: string[] = sorting.map(
          (sort: SortType) => `${sort.id.replace("_", ".")}:${sort.desc ? "desc" : "asc"}`
        );
        const url = `/leave/leaveStatus?${searchQuery}&page=${currentPage}&sort=${sortParams.join(",")}`;
        const result = await getApiCall(url);
        if (result?.data?.leaveStatus) {
          setData(result.data.leaveStatus);
          setMaxPage(result.data.maxPage);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
        setLoading(false);
      }
    };
    fetchLeaveData();
  }, [currentPage, reloadData, getSorting, query]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="p-4">
            <DataTable
              columns={getColumns(setReloadData)}
              data={data}
              setData={setData}
              currentPage={currentPage}
              setMaxPage={setMaxPage}
              setCurrentPage={setCurrentPage}
              setQuery={setQuery}
              query={query}
              setGetSorting={setGetSorting}
              getSorting={getSorting}
              urlType={"manageLeave"}
            />
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxPage={maxPage}
            />
          </div>
        </>
      )}
    </>
  );
}
