"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import ImageUploader from "../components/ImageUploader";
import { useAlert, Alerts } from "next-alert";
import { useMovie } from "../context/MovieContext";

const NewMovie: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const { uploadImage, addUserMovie } = useMovie();

  const [cancel, setCancel] = useState(false);

  const { addAlert } = useAlert();

  const handleImageUpload = (uploadedImage: File | null) => {
    setImage(uploadedImage);
  };

  const currentYear = new Date().getFullYear();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Please input a title"),
    description: Yup.string()
      .required("Please input a description")
      .max(500, "Description must not exceed 500 characters"),
    genre: Yup.string().required("Please select a genre"),
    publishedDate: Yup.number()
      .typeError("Date of production must be a valid year")
      .min(1000, "Date of production must be a 4-digit year")
      .max(
        currentYear,
        `Date of production cannot exceed the current year (${currentYear})`
      )
      .required("Please input the date of production of the movie"),
    movieProducer: Yup.string().required("Please input the movie director"),
  });

  return (
    <div>
      <div className="h-screen sm:px-4 px-2 flex justify-center items-center">
        <div className="flex flex-col lg:flex-row lg:px-20 px-4 gap-6 w-full max-w-7xl">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-left text-white">
              Create a new movie
            </h1>
            <ImageUploader onUpload={handleImageUpload} />
          </div>
          <div className="lg:w-1/2 w-full">
            <Formik
              initialValues={{
                title: "",
                description: "",
                genre: "",
                publishedDate: "",
                movieProducer: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setSubmitting(true);
                  if (!image || image === null) {
                    setSubmitting(false);
                    return addAlert("Error", "Select an Image", "error");
                  }

                  const ImageData = new FormData();

                  ImageData.append("image", image);

                  const uploadedImage = await uploadImage(ImageData);

                  const formData = {
                    ...values,
                    moviePoster: uploadedImage.data.details,
                  };

                  const createMovie = await addUserMovie(formData);

                  if (createMovie.status !== 201) {
                    setSubmitting(false);
                    return addAlert(
                      "Error",
                      `${createMovie.data.message}`,
                      "error"
                    );
                  }
                  setSubmitting(false);

                  values.description = "";
                  values.genre = "";
                  values.movieProducer = "";
                  values.publishedDate = "";
                  values.title = "";

                  addAlert("Success", "Movie Added Successfully", "success");

                  return router.push("/dashboard");
                } catch (error: any) {
                  setSubmitting(false);

                  values.description = "";
                  values.genre = "";
                  values.movieProducer = "";
                  values.publishedDate = "";
                  values.title = "";

                  if (error?.response) {
                    addAlert("Error:", error.response.data, "error");
                  } else if (error?.request) {
                    addAlert("No response received:", error.request, "error");
                  } else {
                    addAlert(
                      "Error setting up request:",
                      error.message,
                      "error"
                    );
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col space-y-4">
                  <Field
                    type="text"
                    name="title"
                    placeholder="Movie Title"
                    className="p-3 bg-[#224957] text-white rounded-lg w-full focus:bg-[#224957]"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Movie Description (Not more than 255 characters)"
                    className="p-3 bg-[#224957]
focus:bg-[#224957] text-white rounded-lg w-full"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <Field
                    as="select"
                    name="genre"
                    className="p-3 bg-[#224957]
focus:bg-[#224957] text-white rounded-lg w-full"
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

                  <Field
                    type="text"
                    name="publishedDate"
                    placeholder="Year Produced (e.g 1997)"
                    className="p-3 bg-[#224957]
focus:bg-[#224957] text-white rounded-lg w-full"
                  />
                  <ErrorMessage
                    name="publishedDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <Field
                    type="text"
                    name="movieProducer"
                    placeholder="Movie Producer"
                    className="p-3 bg-[#224957]
focus:bg-[#224957] text-white rounded-lg w-full"
                  />
                  <ErrorMessage
                    name="movieProducer"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <div className="flex justify-center gap-3">
                    <Button
                      type="button"
                      onClick={() => {
                        setCancel(true);
                        router.push("/dashboard");
                      }}
                      bg="transparent"
                    >
                      {cancel ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Cancel"
                      )}
                    </Button>
                    <Button>
                      {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Alerts
        position={"bottom-right"}
        direction={"right"}
        timer={5000}
        className="rounded-md relative z-50 !w-80"
      />
    </div>
  );
};

export default NewMovie;
