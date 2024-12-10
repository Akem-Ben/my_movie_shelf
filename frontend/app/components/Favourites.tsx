"use client";
import React, { useEffect, useState } from "react";
import { useFavourites } from "../context/FavouritesContext";
import { Delete } from "@mui/icons-material";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

type FavouritesProps = {
  width?: string;
};

const Favourites: React.FC<FavouritesProps> = ({ width }) => {
  const { itemCount, favouritesItems, removeFromFavourites } = useFavourites();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const toggleFavourites = () => {
    setIsOpen((prev) => !prev);
  };

  const singleMovieRedirect = async (id: string, movie: any) => {
    try{
    localStorage.setItem("movie", JSON.stringify(movie));
    setLoading(true);
    await router.push(`/single-movie/${id}`);
    setLoading(false);
    setIsOpen(false);
    } catch (error:any) {
      console.error(error.message);
      }
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center justify-center ${
          width ? `w-${width}` : "w-10"
        } h-10 rounded-full bg-gray-200 transition-colors duration-300 ease-in-out transform hover:scale-105`}
        onClick={toggleFavourites}
      >
        <Star />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 text-xs font-bold text-center text-white bg-red-500 rounded-full">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute text-white bg-[#224957] z-20 right-0 w-[20rem] max-h-[14rem] overflow-auto p-4 border border-gray-300 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg">Favourites</h3>
          {favouritesItems.length === 0 ? (
            <p className="text-white">
              You have no movies in your favourite list
            </p>
          ) : loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <ul>
              {favouritesItems.map((item: any) => (
                <li
                  key={item.id}
                  className="flex hover:cursor-pointer text-white hover:text-gray-400 bg-[#092C39] hover:bg-[#224957] items-center justify-between py-2 border mb-[2px] rounded-lg p-[5px]"
                >
                  <div className="flex items-center" onClick={() => {
                    singleMovieRedirect(item.id, item);
                  }}>
                    <img
                      src={item.moviePoster}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-md mr-2"
                    />
                    <div>
                      <p className="font-semibold">
                        {`${
                          item.title.length <= 50
                            ? item.title
                            : item.title.slice(0, 50) + "..."
                        }`}
                      </p>
                      <p className="text-sm">{item.publishedDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromFavourites(item.id)}
                    className="text-red-400 hover:text-red-900"
                  >
                    <Delete />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Favourites;
