import { TextField } from "@mui/material";
import React, { useState } from "react";

type InputFieldProps = {
  label: string;
  searchTerm?: string | number;
  handleSearch?: any;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, searchTerm, handleSearch}) => {

  return (
    <>
            <TextField
          variant="outlined"
          label={label}
          value={searchTerm}
          onChange={handleSearch}
          className="mb-2 rounded-lg sm:mb-0 sm:w-1/3 w-full bg-[#224957] text-white"
          InputLabelProps={{
            style: { color: 'white' },
            className: '',
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#224957",
              color: "grey",
              borderColor: "#224957",
              "&:hover": {
                backgroundColor: "#0829358C",
                borderColor: 'white'
              },
              "&.Mui-focused": {
                backgroundColor: "white",
                borderColor: "#224957",
                color: "#224957",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#224957",
            },
          }}

        />
    </>
  );
};

export default InputField;
