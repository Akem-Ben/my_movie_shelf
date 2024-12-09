import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { CircularProgress } from "@mui/material";
import { useAlert, Alerts } from "next-alert";
import ImageUploader from "./ImageUploader";
import { useMovie } from "../context/MovieContext";
import { useRouter } from "next/navigation";

type EditModalProps = {
    isOpen: ()=> void;
    id: string;
    movie: Record<string, any>;
}

const EditMovieModal:React.FC<EditModalProps> = ({ isOpen, id, movie }) => {

  const router = useRouter()

  const { addAlert } = useAlert()

  const { editUserMovie, getUserMovies } = useMovie()

  const [cancel, setCancel] = useState(false)

  const initialValues = {
    title: "",
    publishedDate: "",
    description: "",
    movieProducer: ""
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col lg:flex-row gap-4 w-[90%] max-w-5xl max-h-[90vh] bg-[#092C39] rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center bg-[#093545] p-4">
          <ImageUploader onClose={isOpen} id={id} bg={"#093545"} isEdit={true} title="Click here to change movie image or drop new image here"/>
        </div>

        {/* Form Section */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-lg font-bold text-center text-white mb-4">
            You can edit any one or more of these fields
          </h2>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting })=> {
              setSubmitting(true)
              
              try {
                const edit: Record<string, any> | any = await editUserMovie(movie.id, values);
                if (edit.status !== 200) {
                  setSubmitting(false);
                  return addAlert("Error", edit.data.message, "error");
                }
                addAlert("Success", edit.data.message, "success");

                values.title = "";
                values.publishedDate = "";
                values.description = "";
                values.movieProducer = "";

                setSubmitting(false);

                getUserMovies("", 1)

                isOpen()

                return router.push('/dashboard')

              } catch (error: any) {
                setSubmitting(false);

                values.title = "";
                values.publishedDate = "";
                values.description = "";
                values.movieProducer = "";

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
            {({ errors, touched, isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <div>
                  <Field
                    type="text"
                    name="title"
                    placeholder={`Current Title: ${movie?.title}`}
                    className="w-full bg-[#224957] text-white p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    name="publishedDate"
                    placeholder={`Current Year of Production: ${movie.publishedDate}`}
                    className="w-full p-2 bg-[#224957] text-white border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder={`Current Description: ${movie.description}`}
                    className="w-full p-2 bg-[#224957] text-white border border-gray-300 rounded resize-none"
                    rows={4}
                  />
                  <Field
                    type="text"
                    name="movieProducer"
                    placeholder={`Current Movie Producer: ${movie.movieProducer}`}
                    className="w-full p-2 bg-[#224957] text-white mt-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex justify-center gap-3 mt-4">
                  <Button bg="transparent" onClick={()=> {setCancel(true); isOpen()}}>
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
      <Alerts
        position="bottom-right"
        direction="right"
        timer={6000}
        className="rounded-md relative z-50 !w-80"
      ></Alerts>
    </div>
  );
};

export default EditMovieModal;
