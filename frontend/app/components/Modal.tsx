import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { CircularProgress } from "@mui/material";

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
    <div>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#092C39] z-100 p-6 rounded shadow-lg w-96">
            <h2 className="text-lg text-white text-center font-bold mb-4">You can edit any of these fields</h2>
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
                      className={`w-full border p-2 rounded`}
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name="publishedDate"
                      placeholder="Year of Production (e.g 1997)"
                      className={`w-full border p-2 rounded`}
                    />
                  </div>
                  <div>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Description"
                      className={`w-full border p-2 rounded`}
                      rows={4}
                    />
                    <Field
                      type="text"
                      name="movieProducer"
                      placeholder="Producer"
                      className={`w-full border p-2 rounded`}
                    />
                  </div>
                  <div className="flex justify-center gap-3">
                      <Button
                        title={`
                   ${
                     isSubmitting ? (
                       <CircularProgress size={24} color="inherit" />
                     ) : (
                       "Cancel"
                     )
                   }
                    `}
                        bg="transparent"
                        onClick={isOpen}
                      />
                      <Button
                        title={`
                   ${
                     isSubmitting ? (
                       <CircularProgress size={24} color="inherit" />
                     ) : (
                       "Submit"
                     )
                   }
                    `}
                      />
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
