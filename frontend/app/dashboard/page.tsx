"use client";

import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Skeleton,
  Button,
} from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";
import Link from "next/link";
import Button1 from "../components/Button";
import { useMovie } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import InputField from "../components/Input";
import { CirclePlus } from "lucide-react";
import { useDebounce } from "../components/Debounce";

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [redirectLoading, setRedirectLoading] = useState(false);

  const [newMovie, setNewMovie] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedSelectedCategory = useDebounce(selectedCategory, 500);

  const { addAlert } = useAlert();

  const { getUserMovies, userMovies, setUserMovies } = useMovie();

  const allUserMovies = async () => {
    try {
      setLoading(true);

      const movies = await getUserMovies(search, currentPage);

      if (debouncedSearchTerm || debouncedSelectedCategory) {
        if (movies.status !== 200) {
          setLoading(false);
          return setUserMovies([]);
        }
      }

      if (movies.status !== 200) {
        setLoading(false);
        return setUserMovies(null);
      }
      setUserMovies(movies.data.data.movies);
      setTotalPages(movies.data.data.pagination.totalPages);
      return setLoading(false);
    } catch (error: any) {
      if (error?.response) {
        addAlert("Error fetching movies:", error.response.data, "error");
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
    allUserMovies();
  }, [debouncedSearchTerm, debouncedSelectedCategory, currentPage]);

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
    <div className="p-4 flex-grow mb-10">
      {userMovies && (
        <div className="flex flex-col sm:flex-row gap-6 mb-8 justify-between items-center">
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
              Filter Movies by Genre
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
              <MenuItem value="action">Action</MenuItem>
              <MenuItem value="romance">Romance</MenuItem>
              <MenuItem value="sci-fi">Sci-fi</MenuItem>
              <MenuItem value="thriller">Thriller</MenuItem>
              <MenuItem value="drama">Drama</MenuItem>
              <MenuItem value="k-drama">K-drama</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
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
      ) : userMovies === null ? (
        <div className="min-h-[calc(100vh-4rem)] sm:px-0 px-2 flex items-center justify-center">
          <div className="rounded-lg flex items-center justify-center flex-col w-[60%] max-w-[20rem]">
            <h1 className="sm:text-[30px] text-[40px] font-bold mb-4 text-center text-white">
              Your movie list is empty
            </h1>
            <Link href="/new-movie">
              <Button1 width="100" onClick={() => setRedirectLoading(true)}>
                {redirectLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add a new Movie"
                )}
              </Button1>
            </Link>
          </div>
        </div>
      ) : userMovies.length === 0 ? (
        <p className="text-lg text-grey-400 h-[50vh] m-auto text-white">
          Movies not found
        </p>
      ) : (
        <>
          <div className="w-[90%] sm:w-[50%] md:w-[30%] lg:w-[20%] xl:w-[12%]">
            <Link
              href="/new-movie"
              onClick={() => setNewMovie(true)}
              className="w-full"
            >
              <div className="flex w-full mb-8 gap-2 text-white hover:cursor-pointer transition-colors ease-in-out transform hover:text-gray-500">
                <CirclePlus className="text-white" />
                {newMovie ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add a New Movie"
                )}
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userMovies.map((movie: Record<string, any>) => (
              <div key={movie.id}>
                <MovieCard
                  imageSrc={`${movie.moviePoster}`}
                  title={movie.title}
                  date={movie.publishedDate}
                  owner={true}
                  isEdit={true}
                  id={movie.id}
                  movie={movie}
                  loggedIn={true}
                />
              </div>
            ))}
          </div>

          {!loading && totalPages > 1 && (
            <div className="flex justify-center mt-10 my-10">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="mr-2 hover:bg-green-700 hover:text-white"
              >
                <ArrowLeft />
                Previous
              </Button>
              <Button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="hover:bg-green-700 hover:text-white"
              >
                Next
                <ArrowRight />
              </Button>
            </div>
          )}
        </>
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

export default Dashboard;
