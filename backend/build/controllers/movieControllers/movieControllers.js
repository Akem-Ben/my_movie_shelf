"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
const utilities_1 = require("../../utilities");
const createMovie = async (request, response) => {
    const movie = await services_1.moviesServices.userCreateMovieService(request.body, request);
    return utilities_1.responseUtilities.responseHandler(response, movie.message, movie.statusCode, movie.details, movie.data);
};
const fetchSingleMovie = async (request, response) => {
    const { movieId } = request.params;
    console.log('id', movieId);
    const movieSearch = await services_1.moviesServices.getSingleMovie({
        movieId,
    });
    return utilities_1.responseUtilities.responseHandler(response, movieSearch.message, movieSearch.statusCode, movieSearch.details, movieSearch.data);
};
const allDatabaseMovies = async (request, response) => {
    const { query } = request;
    console.log('query', query);
    const movies = await services_1.moviesServices.getAllMoviesInDatabase(query);
    return utilities_1.responseUtilities.responseHandler(response, movies.message, movies.statusCode, movies.details, movies.data);
};
const updateMovie = async (request, response) => {
    const userId = request.user.id;
    const { movieId } = request.params;
    const updatedMovie = await services_1.moviesServices.updateMovieService({
        ...request.body,
        userId,
        movieId
    });
    return utilities_1.responseUtilities.responseHandler(response, updatedMovie.message, updatedMovie.statusCode, updatedMovie.details, updatedMovie.data);
};
const allUserMovies = async (request, response) => {
    const { query } = request;
    const userId = request.user.id;
    const movies = await services_1.moviesServices.getUserMovies({
        userId,
        query
    });
    return utilities_1.responseUtilities.responseHandler(response, movies.message, movies.statusCode, movies.details, movies.data);
};
const deleteSingleUserMovie = async (request, response) => {
    const userId = request.user.id;
    const { movieId } = request.params;
    const result = await services_1.moviesServices.deleteSingleMovie({
        userId,
        movieId
    });
    return utilities_1.responseUtilities.responseHandler(response, result.message, result.statusCode, result.details, result.data);
};
// const deleteManyMovies = async (
//   request: JwtPayload,
//   response: Response
// ): Promise<any> => {
//   const userId = request.user.id;
//   const { shopId } = request.params
//   const result = await vendorProductServices.deleteManyVendorProductsForAShop({
//     ...request.body,
//     userId,
//     shopId
//   });
//   return responseUtilities.responseHandler(
//     response,
//     result.message,
//     result.statusCode,
//     result.details,
//     result.data
//   );
// };
const updateMovieImage = async (request, response) => {
    try {
        const updatedMovieImage = await services_1.moviesServices.updateMovieImageService(request);
        return utilities_1.responseUtilities.responseHandler(response, updatedMovieImage.message, updatedMovieImage.statusCode, updatedMovieImage.data);
    }
    catch (error) {
        console.error("Error in updateMovieImage Controller:", error.message);
        return response.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.default = {
    createMovie,
    fetchSingleMovie,
    allDatabaseMovies,
    updateMovie,
    allUserMovies,
    deleteSingleUserMovie,
    updateMovieImage
    // changeVendorProductStatus,
    // updateVendorProductImage,
};
