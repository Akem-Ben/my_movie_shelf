"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from 'next/link';
import Button from "../components/Button";

const Dashboard: React.FC = () => {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { user } = useAuth()

  const validationSchema = Yup.object({
    loginKey: Yup.string()
      .required("Email/Username is required"),
    password: Yup.string().required("Password is required")
  });

  return (
<div>
  <div className="min-h-[calc(100vh-4rem)] sm:px-0 px-2 flex items-center justify-center">
    <div className="rounded-lg flex items-center justify-center flex-col w-full">
      <h1 className="sm:text-[50px] text-[30px] font-bold mb-4 text-center text-white">
        Your movie list is empty
      </h1>
      <Link href="/new-movie"><Button  width="40" >Add a new Movie</Button></Link>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
