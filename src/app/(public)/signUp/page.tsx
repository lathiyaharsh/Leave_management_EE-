"use client";
import React, { useState } from "react";
import { useFormik } from "formik";

import useModelValidation from "@/Components/ui/form/formValidation";
import useInitialValues from "@/Components/ui/form/useInitialValues";
import { postApiCallWithImage } from "@/Utils/apiCall";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import { signUp } from "@/Components/ui/form/fields";
const SignUp = () => {
  const router = useRouter();
  const [signUpLoading,setSignUpLoading] = useState(false);
  const formik = useFormik({
    initialValues: useInitialValues("add_student"),
    validationSchema: useModelValidation("add_student"),
    onSubmit: async (values) => {
      try {
        setSignUpLoading(true);
        console.log(values);
        const result = await postApiCallWithImage("/user/register", values);
        if (result?.status == 201) {
          setSignUpLoading(false);
          toast.success("SignUp successful");
          formik.resetForm();
          router.push("/login");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("SignUp failed");
      }finally {
        setSignUpLoading(false); // Reset loading state after form submission
      }
    },
  });
  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    formik;

  const fields = signUp;
  return (
    <div className="p-8  bg-gray-100 min-h-screen flex items-center justify-center ">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
        <div className="text-3xl font-bold underline text-center mb-6">
          SignUp Page
        </div>
        <form onSubmit={formik.handleSubmit}>
          <FieldGroup fields={fields} formik={formik} />

          
          {signUpLoading ? (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
