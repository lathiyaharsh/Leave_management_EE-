"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { getApiCall, postApiCall } from "@/Utils/apiCall";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLeaveBalance } from "@/lib/redux/actions/leaveBalance";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import { applyLeave } from "@/Components/ui/form/fields";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import useModelValidation from "@/Components/ui/form/formValidation";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { setUsers } from "@/lib/redux/actions/userActions";
import { useUserContext } from "@/app/context/userContext";
function convertNegativeToZero(number) {
  if (number < 0) {
    return 0;
  } else {
    return number;
  }
}
const FecultyFetcher = () => {
  const dispatch = useAppDispatch();
  const [user] = useUserContext();
  let url = "/user/userList?limit=100&roleType=3";

  useEffect(() => {
    const getApi = async (url: string) => {
      try {
        const result = await getApiCall(url);
        if (result?.data?.userList) {
          dispatch(setUsers(result?.data?.userList));
        }
      } catch (error) {
        console.error("Error fetching user Role:", error);
      }
    };

    getApi(url);
  }, [dispatch]);

  return null;
};

function Leave() {
  const [loading, setLoading] = useState(true);
  const [viewModel, setViewModel] = useState(false);
  const router = useRouter();
  const leaveData = useAppSelector((state) => state.leaveBalance);
  const facultyList = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const fields = applyLeave;
  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const result = await getApiCall("/leave/leaveBalance");
        if (result?.data?.leaveBalance) {
          dispatch(setLeaveBalance(result?.data?.leaveBalance));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: useInitialValues("apply_leave"),
    validationSchema: useModelValidation("apply_leave"),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const result = await postApiCall("/leave/applyLeave", values);
        if (result?.status == 201) {
          setLoading(false);
          toast.success("Apply leave successful");
          setViewModel(false);
          formik.resetForm();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Apply leave failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const options = {
    requestToId: [] as { label: string; value: string }[],
  };

  if (Array.isArray(facultyList?.userList)) {
    for (let i = 0; i < facultyList?.userList.length; i++) {
      options.requestToId.push({
        label: `${facultyList?.userList[i]?.name}`,
        value: `${facultyList?.userList[i]?.id}`,
      });
    }
  }

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    formik;

  const pieData = {
    labels: ["Attendance", "Used Leave"],
    datasets: [
      {
        data: [
          leaveData?.totalWorkingDays - leaveData?.usedLeave,
          leaveData?.usedLeave,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  const pieData1 = {
    labels: ["Total Leave", "AvailableLeave Leave"],
    datasets: [
      {
        data: [
          leaveData?.totalLeave,
          convertNegativeToZero(leaveData?.availableLeave),
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  const remainingLeave = convertNegativeToZero(leaveData?.availableLeave);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-gray-100 flex items-center justify-center p-3">
          <div className="bg-white py-40 px-6 flex justify-evenly rounded-lg shadow-lg w-full  gap-8">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Attendance
              </h2>
              <Pie data={pieData} className="max-w-xs" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Leave Balance
              </h2>
              <div className="mt-6">
                <div className="mb-4">
                  <p className="text-lg font-medium text-gray-800">
                    Total Leave
                  </p>
                  <p className="text-gray-600">{leaveData?.totalLeave}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-gray-800">
                    Available Leave
                  </p>
                  <p className="text-gray-600">{remainingLeave}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-gray-800">
                    Used Leave
                  </p>
                  <p className="text-gray-600">{leaveData?.usedLeave}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-gray-800">
                    Total Working Days
                  </p>
                  <p className="text-gray-600">{leaveData?.totalWorkingDays}</p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-gray-800">
                    Attendance Percentage
                  </p>
                  <p className="text-gray-600">
                    {leaveData?.attendancePercentage}%
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-medium text-gray-800">
                    Academic Year
                  </p>
                  <p className="text-gray-600">{leaveData?.academicYear}</p>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      router.push("/user/leavestatus");
                    }}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                  >
                    Leave Status
                  </button>
                  <button
                    onClick={() => {
                      setViewModel(true);
                    }}
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                  >
                    Apply Leave
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Leave
              </h2>
              <Pie data={pieData1} className="max-w-xs" />
            </div>
            {viewModel && (
              <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
                <FecultyFetcher />
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Apply Leave
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

                    <div className="bg-gray-100 flex items-center justify-center">
                      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 w-full">
                        <form onSubmit={formik.handleSubmit}>
                          <FieldGroup
                            fields={fields}
                            formik={formik}
                            options={options}
                          />
                          <div className="flex justify-start mb-3"></div>
                          {loading ? (
                            <div className="flex justify-center mt-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              >
                                Apply Leave
                              </button>
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Leave;
