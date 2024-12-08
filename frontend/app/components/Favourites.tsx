"use client";
import React, { useState } from "react";
import { useFavourites } from "../context/FavouritesContext";
import { Delete } from "@mui/icons-material";
import { Star } from "lucide-react";

type FavouritesProps = {
  width?: string
}

const Favourites: React.FC<FavouritesProps> = ({width}) => {
  const { itemCount, favouritesItems, removeFromFavourites } = useFavourites();
  const [isOpen, setIsOpen] = useState(false);

  const toggleFavourites = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative ">
      <button
        className={`flex items-center justify-center ${width ? `w-${width}` : "w-10"} h-10 rounded-full bg-gray-200 transition-colors duration-300 ease-in-out transform hover:scale-105`}
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
        <div className="absolute z-20 right-0 w-[20rem] max-h-[14rem] overflow-auto p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg text-gray-400">Favourites</h3>
          {favouritesItems.length === 0 ? (
            <p className="text-gray-600">
              You have no movies in your favourite list
            </p>
          ) : (
            <ul>
              {favouritesItems.map((item: any) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between py-2 border mb-[2px] rounded-lg p-[5px]"
                >
                  <div className="flex items-center">
                    <img
                      src={item.moviePoster}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-md mr-2"
                    />
                    <div>
                      <p className="font-semibold text-gray-400">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-600">{item.publishedDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromFavourites(item.id)}
                    className="text-red-500"
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
