"use client";
import { useRoleContext } from "@/app/context/userRole";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getApiCall, postApiCall } from "@/Utils/apiCall";
import { useUserContext } from "@/app/context/userContext";

function Login() {
  const [role, setRole] = useRoleContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useUserContext();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(12, "Must be 12 characters or less")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values)
        setSignUpLoading(true);
        const result = await postApiCall("/auth/login", values);

        if (result?.status == 200) {
          const findUser: any = await getApiCall("/user/profile");
          if (findUser?.data?.profile) {
            const loginUser = findUser?.data?.profile;
            setUser(loginUser);
            setSignUpLoading(false);
            formik.resetForm();
            router.push("/dashboard");
            toast.success("Login successful");
          } else {
            toast.error("Try again");
            return false;
          }
        } else {
          toast.error(result.message);
        }
      } catch (error: any) {
        console.error(
          "Login error:",
          error.response ? error.response.data : error.message
        );
        toast.error("Login Failed");
      } finally {
        setSignUpLoading(false);
      }
    },
  });
  const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
    formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="text-3xl text-black font-bold underline text-center mb-6">
          Login
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Enter your email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {touched.email && errors.email ? (
            <div className="text-red-500 text-xs italic">{errors.email}</div>
          ) : null}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Enter your password"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
          />
          {touched.password && errors.password ? (
            <div className="text-red-500 text-xs italic">{errors.password}</div>
          ) : null}
        </div>
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
            Log In
          </button>
        </div>
        )}
      </form>
    </div>
  );
}

export default Login;
