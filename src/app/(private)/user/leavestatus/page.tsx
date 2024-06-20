"use client";
import { getApiCall } from "@/Utils/apiCall";
import { getColumns } from "./columns"; // Import the function
import { DataTable } from "./data-table";
import { useState, useEffect } from "react";
import Image from "next/image";
import nextArrow from "@/app/assets/images/fast-forward.png";
import backArrow from "@/app/assets/images/fast-backward.png";
import Loading from "@/Components/Loading";
export default function DemoPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [reloadData, setReloadData] = useState(false);
  const [query, setQuery] = useState("");
  const [getSorting, setGetSorting] = useState("");

  
  const fetchLeaveData = async () => {
    setLoading(true);
    try {
      const searchQuery = `search=${encodeURIComponent(query)}`;
      const sorting = getSorting;
      const sortParams = sorting.map(
        (sort) => `${sort.id}:${sort.desc ? "desc" : "asc"}`
      );
      const url = `/leave/userLeaveStatus?${searchQuery}&page=${currentPage}&sort=${sortParams.join(",")}`;
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

  useEffect(() => {
    fetchLeaveData();
  }, [currentPage, reloadData]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="p-5">
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
            />
             <ul className="flex items-center -space-x-px h-10 text-base justify-end">
            {/* Pagination controls */}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => (p > 1 ? p - 1 : p));
                }}
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover dark:hover"
              >
                <span className="sr-only">Previous</span>
                <Image src={backArrow} alt="Back" width={32} height={32} />
              </a>
            </li>

            {/* Pagination numbers */}
            {Array.from(
              {
                length:
                  Math.min(maxPage, currentPage + 2) -
                  Math.max(1, currentPage - 2) +
                  1,
              },
              (_, index) => Math.max(1, currentPage - 2) + index
            ).map((page) => (
              <li key={page}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  className={`flex items-center justify-center px-4 h-10 leading-tight ${
                    currentPage === page
                      ? "text-blue-600 bg-blue-50 border-blue-300"
                      : "text-gray-500 bg-white border-gray-300"
                  } hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {page}
                </a>
              </li>
            ))}

            {/* Next page button */}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => (p < maxPage ? p + 1 : p));
                }}
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <Image src={nextArrow} alt="Next" width={32} height={32} />
              </a>
            </li>
          </ul>
          </div>
         
        </>
      )}
    </>
  );
}
