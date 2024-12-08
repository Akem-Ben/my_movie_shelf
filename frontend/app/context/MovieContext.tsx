"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { addMovie, uploadMovieImage, allDatabaseMovies, allUserMovies, singleMovie, editMovie, editMovieImage, deleteMovie} from '../axiosFolder/axiosFunctions/movieAxios/movieAxios';


interface MovieContextType {
  addUserMovie: (body: Record<string, any>)=> void;
  getAllMovies: (query:string, page?:number) => void;
  getUserMovies: (query?:string, page?:number) => void;
  uploadImage: (image:any) => void
  getSingleMovie: (id:string) => void
  editMovie: (id:string, body:Record<string, any>) => void;
  editImage: (id:string, image:File) => void;
  deleteUserMovie: (id:string) => void
}

const MovieContext = createContext<MovieContextType | undefined | any>(undefined);

export const MovieProvider: React.FC | any = ({ children }:any) => {
  const [allMovies, setAllMovies] = useState<any | null>(null);
  const [userMovies, setUserMovies] = useState<any | null>(null);

  const getAllMovies = async(query:string, page?:number) => {
    const response = await allDatabaseMovies(query, page);
    if(response.status !== 200){
      return response
    }
    setAllMovies(response.data.data.movies)
    return response
  };

  const addUserMovie = async(body:Record<string, any>) => {
    const response = await addMovie(body);
    return response;
  }

  const getUserMovies = async(query?:string, page?:number) => {
    const response = await allUserMovies(query, page)
    if(response.status !== 200){
      return response
    }
    setUserMovies(response.data.data.movies)
    return response
  };

  const uploadImage = async(image:any) => {
    const response = await uploadMovieImage(image)
    return response
  }

  const editImage = async(id:string, image:File) => {
    const response = await editMovieImage(id, image)
    return response
  }
  const editUserMovie = async(id:string, body:Record<string, any>) => {
   const response = await editMovie(id, body)
  };

  const getSingleMovie = async(id:string) => {
    const response = await singleMovie(id)
    return response
  }

  const deleteUserMovie = async(id:string) => {
    const response = await deleteMovie(id)
    return response
  }

  return (
    <MovieContext.Provider value={{ getAllMovies, editImage, addUserMovie, uploadImage, deleteUserMovie, getSingleMovie, allMovies, editUserMovie, setAllMovies, userMovies, setUserMovies, singleMovie, getUserMovies, editMovie }}>
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
