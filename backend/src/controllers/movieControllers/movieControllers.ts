import { Request, Response, NextFunction } from "express";
import { moviesServices, userAuthService } from "../../services";
import { responseUtilities } from "../../utilities";
import { JwtPayload } from "jsonwebtoken";


const createMovie = async (
    request: JwtPayload,
    response: Response
  ): Promise<any> => {
  
    const movie: any = await moviesServices.userCreateMovieService(request.body, request);
  
    return responseUtilities.responseHandler(
      response,
      movie.message,
      movie.statusCode,
      movie.details,
      movie.data
    );
  };

    const fetchSingleMovie = async (
    request: JwtPayload,
    response: Response
  ): Promise<any> => {
    const { movieId } = request.params;
  
    const movieSearch = await moviesServices.getSingleMovie({
      movieId,
    });
  
    return responseUtilities.responseHandler(
      response,
      movieSearch.message,
      movieSearch.statusCode,
      movieSearch.details,
      movieSearch.data
    );
  };
  
    const allDatabaseMovies = async (
    request: JwtPayload,
    response: Response
  ): Promise<any> => {

  
    const { query } = request
  
    const movies = await moviesServices.getAllMoviesInDatabase(
      query
    );
  
    return responseUtilities.responseHandler(
      response,
      movies.message,
      movies.statusCode,
      movies.details,
      movies.data
    );
  };


  const updateMovie = async (
    request: JwtPayload,
    response: Response
  ): Promise<any> => {
    const userId = request.user.id;
  
    const { movieId } = request.params
  
    const updatedMovie = await moviesServices.updateMovieService({
      ...request.body,
      userId,
      movieId
    });
  
    return responseUtilities.responseHandler(
      response,
      updatedMovie.message,
      updatedMovie.statusCode,
      updatedMovie.details,
      updatedMovie.data
    );
  };
  
  const allUserMovies = async (
    request: JwtPayload,
    response: Response
  ): Promise<any> => {

  
    const { query } = request

    const ownerId = request.user.id
  
    const movies = await moviesServices.getUserMovies({
      ownerId,
      query
    });
  
    return responseUtilities.responseHandler(
      response,
      movies.message,
      movies.statusCode,
      movies.details,
      movies.data
    );
  };

  
  const deleteSingleUserMovie = async (
    request: JwtPayload,
    response: Response
  ): Promise<any> => {
    const userId = request.user.id;
  
    const { movieId } = request.params
  
    const result = await moviesServices.deleteSingleMovie({
      userId,
      movieId
    });
  
    return responseUtilities.responseHandler(
      response,
      result.message,
      result.statusCode,
      result.details,
      result.data
    );
  };
  
const imageUpload = async (
  request: JwtPayload,
  response: Response
): Promise<any> => {
  try {
    const uploadedImage = await moviesServices.uploadImageService(
      request
    );

    return responseUtilities.responseHandler(
      response,
      uploadedImage.message,
      uploadedImage.statusCode,
      uploadedImage.data
    );
  } catch (error: any) {
    console.error("Error in uploading image:", error.message);
    return response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}


  const updateMovieImage = async (
    request: JwtPayload,
    response: Response
  ): Promise<any> => {
    try {
      const updatedMovieImage = await moviesServices.updateMovieImageService(
        request
      );
  
      return responseUtilities.responseHandler(
        response,
        updatedMovieImage.message,
        updatedMovieImage.statusCode,
        updatedMovieImage.data
      );
    } catch (error: any) {
      console.error("Error in updateMovieImage Controller:", error.message);
      return response.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  
  export default {
    createMovie,
    fetchSingleMovie,
    allDatabaseMovies,
    updateMovie,
    allUserMovies,
    deleteSingleUserMovie,
    updateMovieImage,
    imageUpload
  };