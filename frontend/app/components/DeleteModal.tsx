"use client"

import { CircularProgress } from "@mui/material"
import Button from "./Button"
import { useState } from "react"
import { useAlert, Alerts } from "next-alert";
import { useMovie } from "../context/MovieContext";
import { useRouter } from "next/navigation";

type DeleteModalProps = {
    isOpen?: ()=> void;
    id:string;

}

const DeleteModal:React.FC<DeleteModalProps> = ({isOpen, id}) => {

    const { addAlert } = useAlert()

    const router = useRouter()

    const { deleteUserMovie, getUserMovies } = useMovie()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const deleteMovie = async(id:string)=>{
        try{
            setIsSubmitting(true)

            const result = await deleteUserMovie(id)

            if(result.status !== 200){
                setIsSubmitting(false)
                return addAlert('Error', result.data.message, 'error')
            }

            addAlert('success', result.data.message, 'success')

            setIsSubmitting(false)

            if(isOpen) isOpen()

            getUserMovies()

            return router.push('/dashboard')

        }catch (error: any) {
            setIsSubmitting(false);
            
            if (error?.response) {
              addAlert("Error fetching users:", error.response.data, "error");
            } else if (error?.request) {
              addAlert("No response received:", error.request, "error");
            } else {
              addAlert("Error setting up request:", error.message, "error");
            }
          }
    }
    return(
        <div className="fixed gap-4 inset-0 flex text-white items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#092C39] z-100 flex flex-col text-center p-6 rounded shadow-lg w-96">
        <p className="mb-4">Are you sure you want to delete this movie?</p>
        <div className="flex justify-center gap-3">
        <Button onClick={isOpen} bg="transparent">
            Cancel
        </Button>
        <Button onClick={()=> deleteMovie(id)} bg="#EB5757">
        {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Delete"
                    )}
        </Button>
        </div>
        </div>
        <Alerts
        position="bottom-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      ></Alerts>
        </div>
    )
}

export default DeleteModal