"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { CircularProgress } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import hero from '../../public/hero.jpg';
import { Facebook, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Button from '../components/Button';

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
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
            Sign Up
          </h1>

          <Formik
            initialValues={{ loginKey: "", password: "", remember: false }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              setTimeout(() => {
                // signIn(values.loginKey, values.password, values.remember);
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

export default SignUp;
