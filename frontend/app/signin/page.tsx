"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from 'next/link';
import Button from "../components/Button";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    loginKey: Yup.string()
      .required("Email/Username is required"),
    password: Yup.string().required("Password is required")
  });

  return (
    <div>
      <Link href="/">
      <button
        className="text-base mt-10 ml-10 text-white dark:text-gray-300 hover:underline">
        Home
      </button>
      </Link>
      <Link href="/movies">
      <button
        className="text-base mt-10 ml-10 text-white dark:text-gray-300 hover:underline">
        Movies
      </button>
      </Link>
      <div className="h-screen sm:px-0 px-2 flex items-center justify-center">
        <div className="rounded-lg max-w-md w-full">
          <h1 className="text-[50px] font-bold mb-4 text-center text-white">
            Sign In
          </h1>

          <Formik
            initialValues={{ loginKey: "", password: "", remember: false }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              setTimeout(() => {
                signIn(values.loginKey, values.password, values.remember);
                setSubmitting(false);
                router.push("/");
              }, 2000);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col space-y-4">
                <div className="relative">
                  <Field
                    type="text"
                    name="loginKey"
                    placeholder="Email or Username"
                    className="p-3 bg-[#224957] text-[#224957] rounded-lg w-full focus:bg-white"
                  />
                  <ErrorMessage
                    name="loginKey"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="relative">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="p-3 bg-[#224957] text-[#224957] rounded-lg w-full focus:bg-white"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex justify-center items-center space-x-2 p-3 rounded-lg">
                  <Field
                    type="checkbox"
                    name="remember"
                    id="rememberMe"
                    className="appearance-none checked:appearance-auto w-5 h-5 bg-[#224957] rounded focus:ring-2 focus:ring-[#224957]"
                  />
                  <label htmlFor="rememberMe" className="text-white font-light">
                    Remember me
                  </label>
                </div>
              <div>
                <Button title={`
                   ${isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign In"
                  )}
                    `
                }
                width="full"
                 />
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button className="text-sm text-blue-200 hover:underline">
                    Forgot Password?
                  </button>
                  <Link href='/signup'>
                  <button
                    className="text-sm text-white dark:text-gray-300 hover:underline"
                  >
                    Don’t have an account? Sign Up
                  </button>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
