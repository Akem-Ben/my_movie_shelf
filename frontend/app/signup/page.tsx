"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";

const SignUp: React.FC = () => {
  const { addAlert } = useAlert();
  const [homeLoading, setHomeLoading] = useState(false);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const router = useRouter();

  const { signUp } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please retype your password"),
    fullname: Yup.string().required("Please Enter your Fullname"),
    username: Yup.string().required("Please choose a username"),
    phone: Yup.number().required("Phone number is required"),
  });

  return (
    <div>
      <Link href="/">
        <button
          onClick={() => setHomeLoading(true)}
          className="text-base mt-10 ml-10 text-white dark:text-gray-300 hover:underline"
        >
          {homeLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Home"
          )}
        </button>
      </Link>
      <Link href="/movies">
        <button
          onClick={() => setMoviesLoading(true)}
          className="text-base mt-10 ml-10 text-white dark:text-gray-300 hover:underline"
        >
          {moviesLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Movies"
          )}
        </button>
      </Link>
      <div className="h-screen sm:px-0 px-2 flex items-center justify-center">
        <div className="rounded-lg max-w-md w-full">
          <h1 className="text-[50px] font-bold mb-4 text-center text-white">
            Sign Up
          </h1>

          <Formik
            initialValues={{
              email: "",
              fullname: "",
              username: "",
              password: "",
              phone: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              const body = {
                email: values.email,
                fullName: values.fullname,
                password: values.password,
                phone: values.phone.toString(),
                userName: values.username,
              };
              try {
                const register: Record<string, any> | any = await signUp(body);
                if (register.status !== 201) {
                  setSubmitting(false);
                  return addAlert("Error", register.data.message, "error");
                }
                addAlert("Success", register.data.message, "success");

                values.email = "";
                values.fullname = "";
                values.password = "";
                values.phone = "";
                values.username = "";

                setSubmitting(false);

                setTimeout(() => {
                  return router.push("/signin");
                }, 5000);
              } catch (error: any) {
                setSubmitting(false);

                values.email = "";
                values.fullname = "";
                values.password = "";
                values.phone = "";
                values.username = "";

                if (error?.response) {
                  addAlert("Error:", error.response.data, "error");
                } else if (error?.request) {
                  addAlert("No response received:", error.request, "error");
                } else {
                  addAlert("Error setting up request:", error.message, "error");
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col space-y-4">
                <div className="relative">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-3 bg-[#224957] text-gray-500 rounded-lg w-full focus:bg-white"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="relative">
                  <Field
                    type="text"
                    name="fullname"
                    placeholder="Fullname"
                    className="p-3 bg-[#224957] text-gray-500 rounded-lg w-full focus:bg-white"
                  />
                  <ErrorMessage
                    name="fullname"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="relative">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Choose a Username"
                    className="p-3 bg-[#224957] text-gray-500 rounded-lg w-full focus:bg-white"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="relative">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="p-3 bg-[#224957] text-gray-500 rounded-lg w-full focus:bg-white"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="relative">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm Password"
                    className="p-3 bg-[#224957] text-gray-500 rounded-lg w-full focus:bg-white"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="relative">
                  <Field
                    type="number"
                    name="phone"
                    placeholder="phone number"
                    className="p-3 bg-[#224957] text-gray-500 rounded-lg w-full focus:bg-white"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Button width="full">
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    href="/signin"
                    className="text-sm text-white"
                    onClick={() => setLoginLoading(true)}
                  >
                    Already have an account?
                    <button className="ml-2 text-sm text-white">
                      {loginLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Log in"
                      )}
                    </button>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Alerts
        position="bottom-right"
        direction="right"
        timer={6000}
        className="rounded-md relative z-50 !w-80"
      ></Alerts>
    </div>
  );
};

export default SignUp;
