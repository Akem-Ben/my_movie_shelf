"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Button from "../components/Button";
import { Download } from "lucide-react";
import ImageUploader from "../components/ImageUploader";

const NewMovie: React.FC = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    title: Yup.string().required("Please input a title"),
    description: Yup.string().required("Please input a description"),
    genre: Yup.string().required("Please select a genre"),
    publishedDate: Yup.string().required("Please input a publishedDate"),
    movieProducer: Yup.string().required("Please input a movieProducer"),
  });

  return (
    <div>
      <div className="h-screen sm:px-0 px-2 flex justify-center">
        <div className="flex px-40 flex-col w-full">
          <div>
            <h1 className="text-[50px] font-bold mb-4 text-left text-white">
              Create a new movie
            </h1>
          </div>
          <div className="flex justify-around flex-col sm:flex-col lg:flex-row mt-10">
            <div>
            <ImageUploader />
            </div>
            <div className="w-[40%]">
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  genre: "",
                  publishedDate: "",
                  movieProducer: "",
                }}
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
                        name="title"
                        placeholder="Movie Title"
                        className="p-3 bg-[#224957] text-gray-400 rounded-lg w-full focus:bg-white"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="relative">
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Movie Description"
                        className="p-3 bg-[#224957] text-gray-400 rounded-lg w-full focus:bg-white"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="relative">
                      <Field
                        as="select"
                        name="genre"
                        className="p-3 bg-[#224957] text-gray-400 rounded-lg w-full"
                      >
                        <option value="" disabled>
                          Select Genre
                        </option>
                        <option value="action">Action</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="drama">Drama</option>
                        <option value="k-drama">K-Drama</option>
                        <option value="other">Other</option>
                      </Field>

                      <ErrorMessage
                        name="genre"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="relative">
                      <Field
                        type="text"
                        name="publishedDate"
                        placeholder="Year Produced (e.g 1997)"
                        className="p-3 bg-[#224957] text-gray-400 rounded-lg w-full focus:bg-white"
                      />
                      <ErrorMessage
                        name="publishedDate"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="relative">
                      <Field
                        type="text"
                        name="movieProducer"
                        placeholder="Movie Producer"
                        className="p-3 bg-[#224957] text-gray-400 rounded-lg w-full focus:bg-white"
                      />
                      <ErrorMessage
                        name="movieProducer"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex justify-center gap-3">
                      <Button  bg="transparent">
                   {
                     isSubmitting ? (
                       <CircularProgress size={24} color="inherit" />
                     ) : (
                       "Cancel"
                     )
                   }
                      </Button>
                      <Button>
                   {
                     isSubmitting ? (
                       <CircularProgress size={24} color="inherit" />
                     ) : (
                       "Submit"
                     )
                   }
                    </Button>

                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMovie;
