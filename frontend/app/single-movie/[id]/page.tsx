"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress, Skeleton } from "@mui/material";
import { ArrowLeftFromLine, Heart, Pencil, Trash2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useMovie } from "../../context/MovieContext";
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";
import EditMovieModal from "../../components/EditMovieModal";
import DeleteModal from "../../components/DeleteModal";
import { useFavourites } from "../../context/FavouritesContext";

const SingleMovie: React.FC = () => {
  const router = useRouter();

  const { getSingleMovie } = useMovie();

  const { addAlert } = useAlert();

  const pathname = usePathname();

  const [editModal, setEditModal] = useState<any>(false);

  const [user, setUser] = useState<any | null>(null);

  const [mainMovie, setMainMovie] = useState<any | null>(null);

  const id: any = pathname.split("/").pop();

  const [loading, setLoading] = useState(true);

  const [movieDetails, setMovieDetails] = useState<any>(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const [backLoading, setBackLoading] = useState(false);

  const { toggleFavourites, favouritesItems } = useFavourites();

  const [faved, setFaved] = useState(false);

  const favedSetup = (id: string) => {
    const itemExists = favouritesItems.some(
      (element: Record<string, any>) => element.id === id
    );

    if (itemExists) {
      setFaved(true);
    } else if (!itemExists) {
      setFaved(false);
    }
  };

  const userSingleMovie = async () => {
    try {
      setLoading(true);

      const movie = await getSingleMovie(id);

      if (movie.status !== 200) {
        setLoading(false);
        addAlert("Error", movie.data.message, "error");
        return setMovieDetails(null);
      }
      setMovieDetails(movie.data.data.movie);
      return setLoading(false);
    } catch (error: any) {
      if (error?.response) {
        addAlert("Error fetching users:", error.response.data, "error");
        return setLoading(false);
      } else if (error?.request) {
        addAlert("No response received:", error.request, "error");
        return setLoading(false);
      } else {
        addAlert("Error setting up request:", error.message, "error");
        return setLoading(false);
      }
    }
  };

  useEffect(() => {
    userSingleMovie();
  }, []);


  useEffect(() => {

    const setupFavourites = async () => {

      if (typeof window !== "undefined") {
        try {
          const storedUser = localStorage.getItem("user");
          const singleMovie = localStorage.getItem("movie");
  
          if (storedUser && singleMovie) {
            const parsedStoredUser = JSON.parse(storedUser);
            const parsedMovie = JSON.parse(singleMovie);

            setUser(parsedStoredUser);
            setMainMovie(parsedMovie);
  
            await new Promise((resolve) => setTimeout(resolve, 0));
            favedSetup(parsedMovie.id);
          }
        } catch (error) {
          console.error("Error setting up favourites:", error);
        }
      }
    };
  
    setupFavourites();
  }, [toggleFavourites]);
  

  return (
    <div className="">
      <div className="flex transition-colors duration-300 ease-in-out transform text-white gap-2">
        <div
          onClick={() => {
            setBackLoading(true);
            router.back();
          }}
          className="w-[7%] pl-4 gap-2 flex hover:text-gray-500 hover:cursor-pointer"
        >
          <ArrowLeftFromLine className="text-white text-3xl ml-10" />{" "}
          {backLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Back"
          )}
        </div>
      </div>
      {loading ? (
        <div className="p-4 h-[100vh] flex justify-center items-center">
          {Array.from({ length: 1 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width="100%"
              height={250}
              animation="pulse"
              className="mb-4 rounded-lg"
              style={{
                backgroundColor: "rgba(200, 200, 200, 0.2)",
                borderRadius: "10px",
                transform: "scale(1)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          ))}
        </div>
      ) : movieDetails === null || !movieDetails ? (
        <div className="h-[100vh] text-white">
          <p>Something went wrong, please Refresh</p>
        </div>
      ) : (
        <div className="bg-[#093545] text-white gap-4 justify-center flex items-center">
          <div className="block h-[100vh] p-4">
            <div className="flex flex-col lg:w-[60rem] lg:flex-row p-3 bg-[#092C39] hover:bg-[#224957] gap-4 justify-between hover:cursor-pointer hover:scale-105 hover:bg-[#0829358C] transition-all rounded-lg shadow-md">
              <div className="lg:w-1/2 w-full">
                <img
                  src={movieDetails.moviePoster}
                  alt={movieDetails.title}
                  className="w-full h-[22rem] object-cover rounded-md mb-2"
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <h2 className="text-xl text-white font-bold mb-2">
                  <strong className="font-semibold">Title</strong>: {movieDetails.title}
                </h2>
                <div className="flex items-center justify-between pr-4">
                  <h4 className="text-lg text-white font-light mb-2">
                    <strong className="font-semibold">Year of Release</strong>: {movieDetails.publishedDate}
                  </h4>
                </div>
                <div className="flex items-center justify-between pr-4">
                  <h4 className="text-lg text-white font-light mb-2">
                    <strong className="font-semibold">Genre</strong>: {movieDetails.genre}
                  </h4>
                </div>
                <div className="flex items-center justify-between pr-4">
                  <h4 className="text-lg text-white font-light mb-2">
                    <strong className="font-semibold">Director(s)</strong>: {movieDetails.movieProducer}
                  </h4>
                </div>
                <div className="flex items-center justify-between pr-4">
                  <h4 className="text-lg text-white font-light mb-2">
                    <strong className="font-semibold">Description</strong>: {movieDetails.description}
                  </h4>
                </div>
              </div>
              <div className="flex gap-4">
                <Heart
                  className={`${
                    faved ? "fill-[#2BD17E]" : "text-white"
                  } hover:cursor-pointer hover:text-gray-500`}
                  style={{ width: "1rem", height: "1rem" }}
                  onClick={() => {
                    toggleFavourites(mainMovie);
                    favedSetup(mainMovie.id)
                  }}
                />
                {user.user.id === movieDetails.ownerId && (
                  <Pencil
                    className="text-white z-100 hover:cursor-pointer hover:text-gray-500"
                    style={{ width: "1rem", height: "1rem" }}
                    onClick={() => {
                      setEditModal(true);
                    }}
                  />
                )}{" "}
                {user.user.id === movieDetails.ownerId && (
                  <Trash2
                    className="text-white hover:cursor-pointer hover:text-gray-500"
                    style={{ width: "1rem", height: "1rem" }}
                    onClick={() => setDeleteModal(true)}
                  />
                )}
              </div>
            </div>
            {editModal && (
              <EditMovieModal
                isOpen={() => {
                  setEditModal(false);
                }}
                id={id}
                movie={mainMovie}
              />
            )}

            {deleteModal && (
              <DeleteModal
                isOpen={() => {
                  setDeleteModal(false);
                }}
                id={movieDetails.id}
              />
            )}
          </div>
        </div>
      )}
      <Alerts
        position="bottom-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      />
    </div>
  );
};

export default SingleMovie;
