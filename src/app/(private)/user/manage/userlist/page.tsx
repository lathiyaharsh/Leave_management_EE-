"use client";
import { getApiCall } from "@/Utils/apiCall";
import { getColumns } from "./columns"; // Import the function
import { DataTable } from "@/Components/DataTable/data-table";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Image from "next/image";
import nextArrow from "@/app/assets/images/fast-forward.png";
import backArrow from "@/app/assets/images/fast-backward.png";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import useModelValidation from "@/Components/ui/form/formValidation";
import { putApiCall } from "@/Utils/apiCall";
import { editUser } from "@/Components/ui/form/fields";
import { toast } from "react-toastify";
import Loading from "@/Components/Loading";
import { useUserContext } from "@/app/context/userContext";
import { SortType, User } from "@/Utils/types";
export default function DemoPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [reloadData, setReloadData] = useState(false);
  const [query, setQuery] = useState("");
  const [getSorting, setGetSorting] = useState("");
  const [editUserData, setEditUserData] = useState<User | null>(null);
  const [viewModel, setViewModel] = useState(false);
  const [user] = useUserContext();
  
  const deleteUser = async (url: string) => {
    try {
      const results = await getApiCall(url);
      if (results?.status == 200) {
        toast.success("Deleted");
        const url = `/user/studentList?&page=${currentPage}`;
        const result = await getApiCall(url);
        if (result?.data?.userList) {
          setData(result.data.userList);
          setMaxPage(result.data.maxPage);
          setLoading(false);
        }
      } else {
        toast.error(results.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const searchQuery: string = `search=${encodeURIComponent(query)}`;
        const sorting: any = getSorting;
        const sortParams: string[] = sorting.map(
          (sort: SortType) => `${sort.id}:${sort.desc ? "desc" : "asc"}`
        );
        const url = `/user/studentList?${searchQuery}&page=${currentPage}&sort=${sortParams.join(",")}`;
        const result = await getApiCall(url);
        if (result?.data?.userList) {
          setData(result.data.userList);
          setMaxPage(result.data.maxPage);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
        setLoading(false);
      }
    };
    fetchLeaveData();
  }, [currentPage, reloadData,getSorting,query]);

  const formik = useFormik({
    initialValues: useInitialValues("editUser"),
    validationSchema: useModelValidation("editUser"),
    onSubmit: async (values) => {
      try {
        if (editUserData) {
          setLoading(true);
          const result = await putApiCall(
            `/user/editUser/${editUserData?.id}`,
            values
          );
          if (result?.status == 200) {
            setLoading(false);
            toast.success("Update successful");
            setViewModel(false);
            formik.resetForm();
          } else {
            toast.error(result.message);
          }
        }
      } catch (error) {
        toast.error("SignUp failed");
      } finally {
        setLoading(false);
      }
    },
  });
  const fields = editUser;

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    formik;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="p-5">
            <DataTable
              columns={getColumns(setViewModel, setEditUserData, formik)}
              data={data}
              setData={setData}
              currentPage={currentPage}
              setMaxPage={setMaxPage}
              setCurrentPage={setCurrentPage}
              setQuery={setQuery}
              query={query}
              setGetSorting={setGetSorting}
              getSorting={getSorting}
              urlType={'studentList'}
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
          {viewModel && (
            <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Edit User {editUserData?.id} : {editUserData?.name}
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        setViewModel(false);
                        formik.resetForm();
                      }}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div className=" bg-gray-100  flex items-center justify-center ">
                    <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8  w-full">
                      <form onSubmit={formik.handleSubmit}>
                        <FieldGroup fields={fields} formik={formik} options={''} />
                        Current Image
                        <div className="flex justify-start mb-3">
                        {editUserData && (
                            <Image
                              src={editUserData.image}
                              alt="User Avatar"
                              className="rounded "
                              width={400}
                              height={200}
                            />
                          )}
                        </div>
                        {loading ? (
                          <Loading />
                        ) : (
                          <div className="flex items-center justify-between">
                            <button
                              type="submit"
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                              Update Profile
                            </button>
                          </div>
                        )}
                        {user?.user == "admin" ? (
                          <>
                            <button
                              type="button"
                              className="mt-7 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              onClick={() => {
                                deleteUser(
                                  `/user/removeUser/${editUserData?.id}`
                                );
                                setViewModel(false);
                              }}
                            >
                              Delete User
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
