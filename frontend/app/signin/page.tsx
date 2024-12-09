"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Button from "../components/Button";
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const [homeLoading, setHomeLoading] = useState(false);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const router = useRouter();

  const { addAlert } = useAlert();

  const validationSchema = Yup.object({
    loginKey: Yup.string().required("Email/Username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div>
      <Link href="/">
        <button onClick={()=> setHomeLoading(true)} className="text-base mt-10 ml-10 text-white  hover:underline">
        {homeLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Home"
          )}
        </button>
      </Link>
      <Link href="/movies">
        <button onClick={()=> setMoviesLoading(true)} className="text-base mt-10 ml-10 text-white  hover:underline">
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
            Sign In
          </h1>

          <Formik
            initialValues={{ loginKey: "", password: "", remember: false }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);

              const body = {
                loginKey: values.loginKey,
                password: values.password,
              };

              try {
                const response: Record<string, any> | any = await signIn(
                  body,
                  values.remember
                );

                if (response.status !== 200) {
                  setSubmitting(false);
                  return addAlert("Error", response.data.message, "error");
                }

                addAlert("Success", response.data.message, "success");

                values.loginKey = "";
                values.remember = false;
                values.password = "";

                setSubmitting(false);

                return router.push("/dashboard");
              }catch (error: any) {
                setSubmitting(false);

                values.loginKey = "";
                values.remember = false;
                values.password = "";
                
                if (error?.response) {
                  addAlert("Error fetching users:", error.response.data, "error");
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
                    type="text"
                    name="loginKey"
                    placeholder="Email or Username"
                    className="p-3 bg-[#224957] text-white focus:bg-[#224957] rounded-lg w-full"
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
                    className="p-3 bg-[#224957] text-white focus:bg-[#224957] rounded-lg w-full"
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
                <div className="flex justify-center items-center">
                  <Button>
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>

                <div className="flex text-white justify-between items-center mt-4">
                  <button className="text-sm hover:cursor-pointer" disabled>
                    Forgot Password?
                  </button>
                  <Link href="/signup" className="text-sm text-white"  onClick={() => setSignupLoading(true)}>
                    Don’t have an account?
                    <button className="text-sm ml-2 text-white">
                      {signupLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Sign Up"
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
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      ></Alerts>
    </div>
  );
};

export default SignIn;
