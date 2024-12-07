"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { ArrowLeftFromLine, Heart, Pencil, Trash2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useMovie } from "../../context/MovieContext";
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";
import EditMovieModal from "../../components/EditMovieModal";
import DeleteModal from "../../components/DeleteModal";

type SingleMovieProps = {
  isOpen: () => void;
  imageSrc: string;
  title: string;
  date: string;
  owner?: boolean;
  isEdit?: boolean;
};

const SingleMovieModal: React.FC<SingleMovieProps> = ({ isOpen }) => {
  const router = useRouter();

  const { getSingleMovie } = useMovie();

  const { addAlert } = useAlert();

  const pathname = usePathname();

  const [editModal, setEditModal] = useState<any>(false);

  const getUser: Record<string, any> | any = localStorage.getItem("user");

  const user = JSON.parse(getUser);

  const id: any = pathname.split("/").pop();

  const [loading, setLoading] = useState(true);

  const [movieDetails, setMovieDetails] = useState<any>(null);

  const [deleteModal, setDeleteModal] = useState(false);

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
      setLoading(false);
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

  return (
    <div className="">
      <div
        onClick={() => router.back()}
        className="flex transition-colors duration-300 ease-in-out transform text-white gap-2 hover:text-gray-500 hover:cursor-pointer"
      >
        <ArrowLeftFromLine className="text-white ml-4" /> Back
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
            <div className="flex flex-col lg:w-[60rem] lg:flex-row p-3 bg-[#092C39] gap-4 justify-between hover:cursor-pointer hover:scale-105 hover:bg-[#0829358C] transition-all rounded-lg shadow-md">
              <div className="lg:w-1/2 w-full">
                <img
                  src={"imageSrc"}
                  alt={"title"}
                  className="w-full h-[22rem] object-cover rounded-md mb-2"
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <h2 className="text-xl text-white font-bold mb-2">
                  Title: {movieDetails.title}
                </h2>
                <div className="flex items-center justify-between pr-4">
                  <h4 className="text-lg text-white font-light mb-2">
                    Year of Release: {movieDetails.publishedDate}
                  </h4>
                </div>
                <div className="flex items-center justify-between pr-4">
                  <h4 className="text-lg text-white font-light mb-2">
                    Genre: {movieDetails.genre}
                  </h4>
                </div>
                <div className="flex items-center justify-between pr-4">
                  <h4 className="text-lg text-white font-light mb-2">
                    Producer: {movieDetails.movieProducer}
                  </h4>
                </div>
                <div className="flex items-center justify-between pr-4">
                  <h4 className="text-lg text-white font-light mb-2">
                    Description: {movieDetails.description}
                  </h4>
                </div>
              </div>
              <div className="flex gap-4">
                <Heart
                  className="text-white hover:cursor-pointer hover:text-gray-500"
                  style={{ width: "1rem", height: "1rem" }}
                />{" "}
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
                    onClick={()=> setDeleteModal(true)}
                  />
                )}
              </div>
            </div>
            {editModal && (
              <EditMovieModal
                isOpen={() => {
                  setEditModal(false);
                }}
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

export default SingleMovieModal;
