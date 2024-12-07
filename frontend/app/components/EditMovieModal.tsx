import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { CircularProgress } from "@mui/material";
import ImageUploader from "./ImageUploader";

type EditModalProps = {
    isOpen: ()=> void;
}

const EditMovieModal:React.FC<EditModalProps> = ({isOpen}) => {

  const initialValues = {
    title: "",
    genre: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    genre: Yup.string().required("Genre is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Updated Movie Details:", values);
    // setIsOpen(false); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col lg:flex-row gap-4 w-[90%] max-w-5xl max-h-[90vh] bg-[#092C39] rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center bg-[#093545] p-4">
          <ImageUploader bg={"#093545"} />
        </div>

        {/* Form Section */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-lg font-bold text-center text-white mb-4">
            You can edit any of these fields
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <div>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="publishedDate"
                    placeholder="Year of Production (e.g 1997)"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded resize-none"
                    rows={4}
                  />
                  <Field
                    type="text"
                    name="movieProducer"
                    placeholder="Producer"
                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex justify-center gap-3 mt-4">
                  <Button bg="transparent" onClick={isOpen}>
                    {isSubmitting ? (
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
  );
};

export default EditMovieModal;
