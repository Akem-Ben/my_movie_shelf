import { Download } from "lucide-react";
import React, { useState, useRef } from "react";

type ImageUploaderProps = {
    onUpload?: (image: File) => void;
    bg?: string;

}

const ImageUploader: React.FC<ImageUploaderProps>  = ({bg}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedImage(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    setSelectedImage(null);
  };

  const handleChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input dialog
    }
  };

  const handleImageSubmit = () => {
    console.log('hi')
  }

  return (
    <div
      className={`border ${bg ? `bg-${bg}` : ""} relative gap-2 flex justify-center items-center flex-col text-center text-white px-10 py-10 sm:px-20 sm:py-20 md:px-24 md:py-24 lg:px-36 lg:py-36 border-dashed rounded-lg`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {selectedImage ? (
        <div className="flex items-center justify-center flex-col">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md mb-4"
          />
          <p className="text-sm sm:text-base">{selectedImage.name}</p>
          <div className="flex gap-3">
            <div className="flex justify-center mt-2">
              <button
                className="px-4 py-2 text-sm sm:text-base hover:text-gray-500 transition"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
  
            <div className="flex justify-center mt-2">
              <button
                className="px-4 py-2 text-sm sm:text-base hover:text-gray-500 transition"
                onClick={handleImageSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Download />
          <p className="text-sm sm:text-base">
            Click to select <br /> or drop an Image here
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
  );
  
};

export default ImageUploader;
