"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { addMovie, allDatabaseMovies, allUserMovies, singleMovie, editMovie, editMovieImage, deleteMovie} from '../axiosFolder/axiosFunctions/movieAxios/movieAxios';


interface MovieContextType {
  addMovie: (body: Record<string, any>)=> void;
  getAllMovies: (query:string, page?:number) => void;
  getUserMovies: () => void;
  getSingleMovie: (id:string) => void
  editMovie: (id:string, body:Record<string, any>) => void;
  editMovieImage: (id:string, image:any) => void
  deleteMovie: (id:string) => void
}

const MovieContext = createContext<MovieContextType | undefined | any>(undefined);

export const MovieProvider: React.FC | any = ({ children }:any) => {
  const [allMovies, setAllMovies] = useState<any | null>(null);
  const [userMovies, setUserMovies] = useState<any | null>(null);
  const [singleMovie, setSingleMovie] = useState<any | null>(null)


  const getAllMovies = async(query:string, page?:number) => {
    const response = await allDatabaseMovies(query, page);
    if(response.status !== 200){
      return response
    }
    setAllMovies(response.data.data.movies)
    return response
  };

  const getUserMovies = async(body:Record<string, any>) => {
    const response = await allUserMovies()
    return response
  };

  const editUserMovie = async(id:string, body:Record<string, any>) => {
   const response = await editMovie(id, body)
  };


  return (
    <MovieContext.Provider value={{ getAllMovies, allMovies, editUserMovie, setAllMovies, userMovies, setUserMovies, singleMovie, setSingleMovie, getUserMovies, editMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};
