"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Skeleton,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { products } from "../data/products";
import { useFavourites } from "../context/FavouritesContext";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";
import InputField from "../components/Input";
import MovieCard from "../components/MovieCard";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";

const MOVIES = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { addToFavourites } = useFavourites();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const { addAlert } = useAlert();

  const { getAllMovies, allMovies, setAllMovies } = useMovie();

  const allMoviesInDatabase = async () => {
    try {
      setLoading(true);
      const movies = await getAllMovies(search, currentPage);
      if (movies.status !== 200) {
        setLoading(false);
        return setAllMovies([]);
      }
      setAllMovies(movies.data.data.movies);
      setTotalPages(movies.data.data.pagination.totalPages);
      setLoading(false);
      console.log("mvz", movies.data.data);
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

  const user = localStorage.getItem("user");

  useEffect(() => {
    allMoviesInDatabase();
  }, [searchTerm, selectedCategory, currentPage]);

  const handleAddToCart = (product: any) => {
    addToFavourites(product);
    addAlert(
      "Product added to cart successfully",
      "Proceed to checkout",
      "success"
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setSearchTerm(event.target.value);
    setSelectedCategory("");
    setCurrentPage(1);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: string }> | any
  ) => {
    setSearch(event.target.value as string);
    setSelectedCategory(event.target.value as string);
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <>
      <div className="p-4 lg:px-[7rem]">
        <div className="mb-[2rem]">
          <Link href="/">
            <button className="text-base mt-10 ml-10 text-white dark:text-gray-300 hover:underline">
              Home
            </button>
          </Link>
          {!user ? (
            <>
              <Link href="/signup">
                <button className="text-base mt-10 ml-10 text-white dark:text-gray-300 hover:underline">
                  Register
                </button>
              </Link>
              <Link href="/signin">
                <button className="text-base mt-10 ml-10 text-white dark:text-gray-300 hover:underline">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <button className="text-base mt-10 ml-10 text-white dark:text-gray-300 hover:underline">
                  My Movies
                </button>
              </Link>
              <Link href="/signin">
                <button className="text-base mt-10 ml-10 text-white dark:text-gray-300 hover:underline">
                  Logout
                </button>
              </Link>
            </>
          )}
        </div>
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <InputField
            label={"Search Titles, Year or Producer"}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
          />

          <FormControl
            variant="outlined"
            className="w-full sm:w-1/4 ml-2 text-white"
          >
            <InputLabel className="text-white">
              Filter Movies by Grenre
            </InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
              style={{
                backgroundColor: "#224957",
                color: "white",
                borderColor: "#224957",
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    color: "#224957",
                  },
                },
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="action">action</MenuItem>
              <MenuItem value="romance">romance</MenuItem>
              <MenuItem value="sci-fi">sci-fi</MenuItem>
              <MenuItem value="thriler">thriler</MenuItem>
              <MenuItem value="drama">drama</MenuItem>
              <MenuItem value="k-drama">k-drama</MenuItem>
              <MenuItem value="other">other</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 9 }).map((_, index) => (
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
            ))
          ) : allMovies === null || allMovies.length === 0 ? (
            <p className="text-lg text-grey-400 h-[50vh] m-auto text-white">
              No Movies found
            </p>
          ) : (
            allMovies.map((movie: Record<string, any>) => (
              <div key={movie.id} className="">
                <MovieCard
                  imageSrc={`${movie.moviePoster}`}
                  title={movie.title}
                  date={movie.publishedDate}
                  id={movie.id}
                />
              </div>
            ))
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-10 my-10">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="mr-2"
            >
              <ArrowLeft />
              Previous
            </Button>
            <Button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
      <Alerts
        position="bottom-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      ></Alerts>
    </>
  );
};

export default MOVIES;
