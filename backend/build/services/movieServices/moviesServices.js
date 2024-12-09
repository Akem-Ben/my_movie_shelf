"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const helpers_1 = require("../../helpers");
const utilities_1 = require("../../utilities");
const userModel_1 = __importDefault(require("../../models/users/userModel"));
const userCreateMovieService = utilities_1.errorUtilities.withErrorHandling(async (moviePayload, request) => {
    const responseHandler = {
        statusCode: 0,
        message: "",
    };
    const { title } = moviePayload;
    const userId = request.user.id;
    const movie = await helpers_1.movieDatabase.movieDatabaseHelper.getOne({
        title,
        ownerId: userId,
    });
    if (movie) {
        throw utilities_1.errorUtilities.createError(`You already have a movie with this title in your catalogue. If you have different movies with the same title, you can include the movie names with the date of launch as the name. Example: ${title} 2014`, 400);
    }
    const payload = {
        ...moviePayload,
        id: (0, uuid_1.v4)(),
        ownerId: userId,
    };
    const operations = [
        async (transaction) => {
            await helpers_1.movieDatabase.movieDatabaseHelper.create(payload, transaction);
        },
        async (transaction) => {
            await userModel_1.default.increment("numberOfMoviesAdded", { by: 1, transaction, where: { id: userId } });
        },
    ];
    await helpers_1.performTransaction.performTransaction(operations);
    const newmovie = await helpers_1.movieDatabase.movieDatabaseHelper.getOne({
        title,
        ownerId: userId,
    });
    responseHandler.statusCode = 201;
    responseHandler.message = "Movie added successfully";
    responseHandler.data = {
        movie: newmovie
    };
    return responseHandler;
});
const getSingleMovie = utilities_1.errorUtilities.withErrorHandling(async (queryDetails) => {
    const responseHandler = {
        statusCode: 0,
        message: "",
    };
    const { movieId } = queryDetails;
    const movie = await helpers_1.movieDatabase.movieDatabaseHelper.getOne({ id: movieId });
    if (!movie) {
        throw utilities_1.errorUtilities.createError("Movie not found. Please try again or contact admin", 404);
    }
    responseHandler.statusCode = 200;
    responseHandler.message = "Movie fetched successfully";
    responseHandler.data = {
        movie,
    };
    return responseHandler;
});
const getAllMoviesInDatabase = utilities_1.errorUtilities.withErrorHandling(async (queryDetails) => {
    const responseHandler = {
        statusCode: 0,
        message: "",
    };
    let size = 9;
    let skip = 0;
    let page = 1;
    let filter = {};
    if (queryDetails) {
        const searchTerm = queryDetails.search || "";
        filter = await helpers_1.generalHelpers.queryFilter(searchTerm);
        skip = (Number(queryDetails.page) - 1) * size || 0;
        page = (Number(queryDetails.page)) || 1;
    }
    const options = {
        page,
        offset: skip,
        limit: size,
    };
    const projection = {
        id: 1,
        title: 1,
        publishedDate: 1,
        description: 1,
        moviePoster: 1,
        ownerId: 1,
        movieProducer: 1
    };
    const movies = await helpers_1.movieDatabase.movieDatabaseHelper.getMany(filter, projection, options);
    if (!movies || movies.rows.length === 0) {
        throw utilities_1.errorUtilities.createError("No movies found.", 404);
    }
    const currentPage = Math.ceil(skip / size) + 1;
    const totalPages = Math.ceil(movies.count / size);
    responseHandler.statusCode = 200;
    responseHandler.message = "movies fetched successfully";
    responseHandler.data = {
        movies: movies.rows,
        pagination: {
            currentPage,
            totalPages,
            totalItems: movies.count,
            pageSize: size,
        }
    };
    return responseHandler;
});
const updateMovieService = utilities_1.errorUtilities.withErrorHandling(async (updatePayload) => {
    const responseHandler = {
        statusCode: 0,
        message: "",
    };
    if ((!updatePayload.title || updatePayload.title === "") &&
        (!updatePayload.publishedDate) &&
        (!updatePayload.description || updatePayload.description === "") &&
        (!updatePayload.movieProducer || updatePayload.movieProducer === "")) {
        throw utilities_1.errorUtilities.createError("At least one field must be selected for update", 400);
    }
    if (updatePayload.publishedDate) {
        if (isNaN(Number(updatePayload.publishedDate))) {
            throw utilities_1.errorUtilities.createError("The Date of production must be a valid year", 400);
        }
    }
    const { userId, movieId } = updatePayload;
    const movie = await helpers_1.movieDatabase.movieDatabaseHelper.getOne({ id: movieId });
    if (!movie) {
        throw utilities_1.errorUtilities.createError("Movie not found", 404);
    }
    if (movie.ownerId != userId) {
        throw utilities_1.errorUtilities.createError("You are not the owner of this movie, you can only edit movies you have created. Thank you.", 400);
    }
    let updateDetails = {};
    if (updatePayload.title) {
        updateDetails.title = updatePayload.title;
    }
    if (updatePayload.publishedDate) {
        updateDetails.publishedDate = updatePayload.publishedDate;
    }
    if (updatePayload.description) {
        updateDetails.description = updatePayload.description;
    }
    if (updatePayload.movieProducer) {
        updateDetails.movieProducer = updatePayload.movieProducer;
    }
    const newMovie = await helpers_1.movieDatabase.movieDatabaseHelper.updateOne({
        id: movieId,
    }, updateDetails);
    responseHandler.statusCode = 200;
    responseHandler.message = "Movie updated successfully";
    responseHandler.data = {
        movie: newMovie
    };
    return responseHandler;
});
const getUserMovies = utilities_1.errorUtilities.withErrorHandling(async (queryDetails) => {
    const responseHandler = {
        statusCode: 0,
        message: "",
    };
    const { ownerId } = queryDetails;
    if (!ownerId) {
        throw new Error("User ID is required to fetch Movies, Please login");
    }
    let size = 9;
    let skip = 0;
    let page = 1;
    let filter = {};
    if (queryDetails) {
        const searchTerm = queryDetails.query.search || "";
        filter = await helpers_1.generalHelpers.queryFilter(searchTerm);
        skip = (Number(queryDetails.query.page) - 1) * size || 0;
        page = (Number(queryDetails.query.page)) || 1;
    }
    const options = {
        page,
        offset: skip,
        limit: size,
    };
    const projection = {
        id: 1,
        title: 1,
        publishedDate: 1,
        description: 1,
        moviePoster: 1,
        ownerId: 1,
        movieProducer: 1
    };
    filter.ownerId = ownerId;
    const userMovies = await helpers_1.movieDatabase.movieDatabaseHelper.getMany(filter, projection, options);
    if (!userMovies || userMovies.rows.length === 0) {
        throw utilities_1.errorUtilities.createError("You do not have any movies yet, add one.", 404);
    }
    const currentPage = Math.ceil(skip / size) + 1;
    const totalPages = Math.ceil(userMovies.count / size);
    responseHandler.statusCode = 200;
    responseHandler.message = "movies fetched successfully";
    responseHandler.data = {
        movies: userMovies.rows,
        pagination: {
            currentPage,
            totalPages,
            totalItems: userMovies.count,
            pageSize: size,
        }
    };
    return responseHandler;
});
const deleteSingleMovie = utilities_1.errorUtilities.withErrorHandling(async (deleteDetails) => {
    const responseHandler = {
        statusCode: 0,
        message: "",
    };
    const { movieId, userId } = deleteDetails;
    const movie = await helpers_1.movieDatabase.movieDatabaseHelper.getOne({ id: movieId });
    if (!movie) {
        throw utilities_1.errorUtilities.createError("Movie not found", 404);
    }
    if (movie.ownerId != userId) {
        throw utilities_1.errorUtilities.createError("You are not the owner of this movie. You cannot delete the movie", 400);
    }
    const payload = {
        id: movieId,
        ownerId: userId
    };
    const operations = [
        async (transaction) => {
            await helpers_1.movieDatabase.movieDatabaseHelper.deleteOne(payload, transaction);
        },
        async (transaction) => {
            await userModel_1.default.decrement("numberOfMoviesAdded", { by: 1, transaction, where: { id: userId } });
        },
    ];
    await helpers_1.performTransaction.performTransaction(operations);
    responseHandler.statusCode = 200;
    responseHandler.message = "Movie deleted successfully";
    return responseHandler;
});
const updateMovieImageService = utilities_1.errorUtilities.withErrorHandling(async (request) => {
    const responseHandler = {
        statusCode: 0,
        message: "",
    };
    const imageUpdate = request?.file?.path;
    if (!imageUpdate) {
        throw utilities_1.errorUtilities.createError("Select an Image", 400);
    }
    const { movieId } = request.params;
    console.log('er', movieId);
    const movieCheck = await helpers_1.movieDatabase.movieDatabaseHelper.getOne({ id: movieId }, { id: 1 });
    if (!movieCheck) {
        throw utilities_1.errorUtilities.createError("Movie not found", 404);
    }
    const newMovie = await helpers_1.movieDatabase.movieDatabaseHelper.updateOne({
        id: movieId,
    }, {
        moviePoster: imageUpdate
    });
    responseHandler.statusCode = 200;
    responseHandler.message = "Movie image changed successfully";
    responseHandler.data = {
        mmovie: newMovie,
    };
    return responseHandler;
});
const uploadImageService = utilities_1.errorUtilities.withErrorHandling(async (request) => {
    const responseHandler = {
        statusCode: 0,
        message: "",
        data: ""
    };
    try {
        const file = request?.file?.path;
        if (!file) {
            throw utilities_1.errorUtilities.createError("Select an Image", 400);
        }
        responseHandler.statusCode = 200;
        responseHandler.message = "Image uploaded successfully";
        responseHandler.data = file;
        return responseHandler;
    }
    catch (error) {
        console.error("Image Upload Error:", error.message);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
});
exports.default = {
    userCreateMovieService,
    getSingleMovie,
    getAllMoviesInDatabase,
    updateMovieService,
    getUserMovies,
    deleteSingleMovie,
    uploadImageService,
    updateMovieImageService
};
