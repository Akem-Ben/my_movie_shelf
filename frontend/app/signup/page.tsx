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
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please retype your password'),
      fullname: Yup.string().required('Please Enter your Fullname'),
      username: Yup.string().required('Please choose a username'),
      phone: Yup.number().required('Phone number is required')
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
            initialValues={{ email: "", fullname: "", username: "", password: "", phone: "" }}
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
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-3 bg-[#224957] text-[#224957] rounded-lg w-full focus:bg-white"
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
                    className="p-3 bg-[#224957] text-[#224957] rounded-lg w-full focus:bg-white"
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
                    className="p-3 bg-[#224957] text-[#224957] rounded-lg w-full focus:bg-white"
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
                    name="confirmPassword"
                    placeholder="confirm Password"
                    className="p-3 bg-[#224957] text-[#224957] rounded-lg w-full focus:bg-white"
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
                    className="p-3 bg-[#224957] text-[#224957] rounded-lg w-full focus:bg-white"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

              <div>
                <Button title={`
                   ${isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign Up"
                  )}
                    `
                }
                width="full"
                 />
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Link href='/signin'>
                  <button
                    className="text-sm text-white dark:text-gray-300 hover:underline"
                  >
                    Already have an account? Log in
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
