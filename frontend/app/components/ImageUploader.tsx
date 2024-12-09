// ImageUploader.tsx
import { Download, Trash2 } from "lucide-react";
import React, { useState, useRef } from "react";
import { useAlert, Alerts } from "next-alert";
import { useMovie } from "../context/MovieContext";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

type ImageUploaderProps = {
  onUpload?: (image: File) => void;
  bg?: string;
  title?: string;
  isEdit?: boolean;
  id?: string;
  onClose?: any | (() => void)
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  onUpload,
  bg,
  title,
  isEdit,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()

  const { editImage, getUserMovies } = useMovie()

  const { addAlert } = useAlert();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      setSelectedImage(image);
      if (onUpload) onUpload(image);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const image = e.dataTransfer.files[0];
      setSelectedImage(image);
      if (onUpload) onUpload(image);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    setSelectedImage(null);
    if (onUpload) onUpload(null as any);
  };

  const handleEditImage = async () => {
    try {

      setSubmitting(true)

      if (!selectedImage) {
        setSubmitting(false)
        addAlert("Error", "Please Select an Image to edit", "error");
        return;
      }

      const ImageData = new FormData();

      ImageData.append("image", selectedImage);

      const uploadedImage = await editImage(id, ImageData);

      if(uploadedImage.status !== 200){
        setSubmitting(false)
        addAlert("Error", uploadedImage.data.message, "error");
      }

      setSubmitting(false)

      addAlert("Success", uploadedImage.data.message, "success");

      getUserMovies("", 1)

      onClose()

      return router.push('/dashboard')


    } catch (error: any) {
      setSubmitting(false);

      if (error?.response) {
        addAlert("Error:", error.response.data, "error");
      } else if (error?.request) {
        addAlert("No response received:", error.request, "error");
      } else {
        addAlert("Error setting up request:", error.message, "error");
      }
    }
  };

  return (
    <div>
      <div
        className={`border ${
          bg ? `bg-${bg}` : ""
        } relative gap-2 flex justify-center items-center flex-col text-center text-white px-10 py-10 sm:px-20 sm:py-20 md:px-24 md:py-24 lg:px-36 lg:py-36 border-dashed rounded-lg`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedImage ? (
          <div className="flex items-center justify-center flex-col">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-24 bg-yellow-700 h-24 sm:w-32 sm:h-32 object-cover rounded-md mb-4"
            />
            <p className="text-sm sm:text-base">
              {selectedImage.name.slice(0, 17)}...
            </p>
            <div className="flex gap-3">
              <div className="flex justify-center mt-2">
                {!submitting && (
                <button
                  className="px-4 py-2 text-sm sm:text-base hover:text-gray-500 transition"
                  onClick={handleDelete}
                >
                  <Trash2
                    className="text-white hover:cursor-pointer hover:text-gray-500 transition"
                    style={{ width: "1rem", height: "1rem" }}
                  />
                </button>
                )}
                {isEdit && (
                  <div className="flex justify-center mt-2">
                    <button
                      className="px-4 py-2 text-sm sm:text-base hover:text-gray-500 transition"
                      onClick={handleEditImage}
                    >
                      {
                       submitting ? (
                       <CircularProgress size={24} color="inherit" />
                     ) : (
                       "Submit"
                     )
                   }
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Download />
            <p className="text-sm sm:text-base">
              {title ? title : `Click to choose Image or drop Image here`}
            </p>
            <input
              type="file"
              accept="image/*"
              className="absolute w-[100%] h-[100%] opacity-0 cursor-pointer"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </>
        )}
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

export default ImageUploader;
