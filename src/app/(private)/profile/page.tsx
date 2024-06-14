"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUserContext } from "@/app/context/userContext";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import useModelValidation from "@/Components/ui/form/formValidation";
import { putApiCall } from "@/Utils/apiCall";
import { updateProfile } from "@/Components/ui/form/fields";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const router = useRouter();
  const [user,setUser] = useUserContext();
  const { name, email, gender, image, phone, department, address, div } = user;

  const fields = updateProfile

  const formik = useFormik({
    initialValues: useInitialValues("update_profile"),
    validationSchema: useModelValidation("update_profile"),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const result = await putApiCall("/user/editProfile", values);
        if (result?.status == 200) {
          setLoading(false);
          setUser((v)=>{return { ...v , ...values }})
          toast.success("Update successful");
          setViewModel(false)
          formik.resetForm();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("SignUp failed");
      } finally {
        setLoading(false);
      }
    },
  });
  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    formik;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <>
          <div className="flex items-center justify-center">
            <Image
              src={image}
              alt="User Avatar"
              className="rounded w-36 h-36"
              width={150}
              height={150}
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-black">{user.name}</h2>
            <p className="text-gray-600">{email}</p>
            <div className="mt-4">
              <p className="text-gray-800">Div:</p>
              <p className="text-gray-600">{div ? div : "Not assined"} </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-800">Address:</p>
              <p className="text-gray-600">{address}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-800">Phone:</p>
              <p className="text-gray-600">{phone}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-800">Gender:</p>
              <p className="text-gray-600">{gender}</p>
            </div>

            <div className="mt-4">
              <p className="text-gray-800">Role:</p>
              <p className="text-gray-600">{user?.user}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  formik.setValues(user);
                  setViewModel(true);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {viewModel && (
            <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Edit Profile
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
                        <FieldGroup fields={fields} formik={formik} />
                        <div className="flex justify-start mb-3">
                          <Image
                            src={image}
                            alt="User Avatar"
                            className="rounded "
                            width={50}
                            height={50}
                          />
                        </div>
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
                              Update Profile
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
        </>
      </div>
    </div>
  );
}

export default Profile;
