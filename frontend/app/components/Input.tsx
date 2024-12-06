import { TextField } from "@mui/material";
import React, { useState } from "react";

type InputFieldProps = {
  label: string;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label }) => {
  const [value, setValue] = useState("");

  return (
    <>
            <TextField
          variant="outlined"
          label={label}
        //   value={searchTerm}
        //   onChange={handleSearch}
          className="mb-2 rounded-lg sm:mb-0 sm:w-1/3 w-full bg-[#224957] text-white"
          InputLabelProps={{
            style: { color: 'white' },
            className: '',
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

        />
    </>
  );
};

export default InputField;
