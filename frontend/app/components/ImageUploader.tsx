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
    <div className="w-full">
      <div
        className={`border ${
          bg ? `bg-${bg}` : ""
        } relative flex flex-col justify-center items-center text-center text-white px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12 border-dashed rounded-lg`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedImage ? (
          <div className="flex items-center justify-center flex-col">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-md mb-4"
            />
            <p className="text-sm sm:text-base">
              {selectedImage.name.slice(0, 17)}...
            </p>
            <button
              className="px-4 py-2 text-sm hover:text-gray-500 transition"
              onClick={handleDelete}
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <Download />
            <p className="text-sm sm:text-base">
              {title || `Click to choose Image or drop Image here`}
            </p>
            <input
              type="file"
              accept="image/*"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </>
        )}
      </div>
    </div>
  );
  
  
};

export default ImageUploader;
