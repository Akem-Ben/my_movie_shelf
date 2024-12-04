import { TextField } from "@mui/material";
import React, { useState } from "react";

type InputFieldProps = {
  label: string;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label }) => {
  const [value, setValue] = useState("");

  return (
    // <div className="w-full max-w-md mx-auto h-[50px]">
    //   <div className="relative h-full">
    //     <input
    //       type="text"
    //       value={value}
    //       onChange={(e) => setValue(e.target.value)}
    //       id="input-field"
    //       className={`peer w-full h-full px-4 py-2 bg-[#224957] text-white border ${
    //         error ? "border-red-500 text-red-500" : "border-transparent"
    //       } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#224957] focus:border-[#224957] focus:bg-white focus:text-[#224957] focus:cursor-text`}
    //       placeholder=" "
    //     />
    //     <label
    //       htmlFor="input-field"
    //       className={`absolute left-4 text-white text-sm transition-all duration-300 ease-in-out pointer-events-none peer-placeholder-shown:top-2/4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#224957] ${
    //         error ? "peer-focus:text-red-500" : ""
    //       }`}
    //     >
    //       {label}
    //     </label>
    //   </div>
    //   {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    // </div>
    <>
            <TextField
          variant="outlined"
          label={label}
        //   value={searchTerm}
        //   onChange={handleSearch}
          className="mb-2 sm:mb-0 sm:w-1/3 w-full dark:bg-[#224957] dark:text-white"
          InputLabelProps={{
            style: { color: 'white' },
            className: 'dark:text-gray-300',
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#224957", // Default background
              color: "grey",
              borderColor: "#224957",
              "&:hover": {
                backgroundColor: "#0829358C", // Background on hover
                borderColor: 'white'
              },
              "&.Mui-focused": {
                backgroundColor: "white", // Background on focus
                borderColor: "#224957", // Optional border color
                color: "#224957", // Optional color
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#224957", // Border color for dark mode
            },
          }}
        //   InputProps={{
        //     style: {
        //       backgroundColor: '',
        //       color: 'grey',
        //       borderColor: 'rgba(255, 255, 255, 0.3)',
        //     },
        //     classes: { notchedOutline: 'dark:border-gray-500' },
        //   }}

        />
    </>
  );
};

export default InputField;
