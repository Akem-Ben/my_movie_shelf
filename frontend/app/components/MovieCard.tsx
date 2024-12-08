"use client";

import { Pencil, Trash2, Heart } from "lucide-react";
import EditMovieModal from "./EditMovieModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";
import DeleteModal from "./DeleteModal";
import { CircularProgress } from "@mui/material";
import { useFavourites } from "../context/FavouritesContext";

type MovieCardProp = {
  imageSrc: string;
  id: string;
  title: string;
  date: string;
  owner?: boolean;
  isEdit?: boolean;
  movie? : Record<string, any> | any;
  loggedIn?: boolean;
};

const MovieCard: React.FC<MovieCardProp> = ({
  id,
  imageSrc,
  title,
  date,
  owner,
  isEdit,
  movie,
  loggedIn
}) => {
  const user: any = localStorage.getItem("user");

  const realUser = JSON.parse(user);

  const [deleteModal, setDeleteModal] = useState(false);

  const [movieCardLoading, setMovieCardLoading] = useState(false)

  const router = useRouter();

  const { addAlert } = useAlert();

  const [faved, setFaved] = useState(false)

  const { toggleFavourites, favouritesItems } = useFavourites()

  const favedSetup = (id: string) => {
    const itemExists = favouritesItems.some(
      (element: Record<string, any>) => element.id === id
    );
  
    if (itemExists) {

      setFaved(true)
    } else {
      setFaved(false)
    }
  };

  function singleMovieRedirect(id: string) {
    setMovieCardLoading(true)
    if (realUser) {
      return router.push(`/single-movie/${id}`);
    } else {
      setMovieCardLoading(false)
      return addAlert(
        "Error",
        "Only Logged in users can view movie details",
        "error"
      );
    }
  }

  const [editModal, setEditModal] = useState(false);

  useEffect(()=>{
    favedSetup(movie.id)
  })

  return (
    <>
      <div className="block bg-[#092C39] h-[30rem] hover:cursor-pointer hover:scale-105 hover:bg-[#0829358C] transition-all rounded-lg shadow-md p-4">
      <div onClick={() => singleMovieRedirect(id)}>
  {movieCardLoading ? (
    <div className="text-white h-[25rem] flex justify-center items-center">
    <CircularProgress size={100} color="inherit" />
    </div>
  ) : (
    <>
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-[22rem] object-cover rounded-md mb-2"
      />
      <h2 className="text-xl text-white font-bold mb-2">{title}</h2>
      <div className="flex items-center justify-between pr-4">
        <h4 className="text-lg text-white font-light mb-2">{date}</h4>
      </div>
    </>
  )}
</div>
        <div className="flex gap-4">
          {loggedIn && (
          <Heart
            className={`${faved ? "fill-red-800" : "text-white"} hover:cursor-pointer hover:text-gray-500`}
            style={{ width: "1rem", height: "1rem" }}
            onClick={()=> {toggleFavourites(movie); favedSetup(id)}}
          />
          )}{" "}
          {owner && (
            <Pencil
              className="text-white z-100 hover:cursor-pointer hover:text-gray-500"
              style={{ width: "1rem", height: "1rem" }}
              onClick={() => {
                setEditModal(true), (isEdit = true);
              }}
            />
          )}{" "}
          {owner && (
            <Trash2
            onClick={()=> setDeleteModal(true)}
              className="text-white hover:cursor-pointer hover:text-gray-500"
              style={{ width: "1rem", height: "1rem" }}
            />
          )}
        </div>
      </div>
      {editModal && (
        <EditMovieModal
          isOpen={() => {
            setEditModal(false);
          } } id={id}/>
      )}
      <Alerts
        position="bottom-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      ></Alerts>

      {deleteModal && (
        <DeleteModal
          isOpen={() => {
            setDeleteModal(false);
          }}
          id={id}
        />
      )}
    </>
  );
};

export default MovieCard;
