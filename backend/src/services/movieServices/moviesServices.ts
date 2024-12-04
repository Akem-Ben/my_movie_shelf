import { v4 } from "uuid";
import { USERS_APP_BASE_URL } from "../../configurations/envKeys";
import { movieDatabase, generalHelpers, userDatabase, performTransaction } from "../../helpers";
import { ResponseDetails } from "../../types/generalTypes";
import { errorUtilities, mailUtilities, } from "../../utilities";
import { JwtPayload } from "jsonwebtoken";
import validator from "validator";
import sequelize, { Transaction } from "sequelize";
import User from "../../models/users/userModel";

const userCreateMovieService = errorUtilities.withErrorHandling(
  async (
    moviePayload: Record<string, any>,
    request: JwtPayload
  ) : Promise<Record<string, any>> => {
    const responseHandler: ResponseDetails = {
      statusCode: 0,
      message: "",
    };

    const { title } = moviePayload;

    const userId = request.user.id;

    const movie = await movieDatabase.movieDatabaseHelper.getOne({
      title,
      ownerId: userId,
    });

    if (movie) {
      throw errorUtilities.createError(
        `You already have a movie with this title in your catalogue. If you have different movies with the same title, you can include the movie names with the date of launch as the name. Example: ${title} 2014`, 400
      );
    }

    const payload = {
      ...moviePayload,
      id: v4(),
      ownerId: userId,
    };

    const operations = [
        async (transaction: Transaction) => {
          await movieDatabase.movieDatabaseHelper.create(payload, transaction);
        },
        async (transaction: Transaction) => {
          await User.increment("numberOfMoviesAdded" , { by: 1, transaction,  where: { id: userId } });
        },
      ];
      
      await performTransaction.performTransaction(operations);
      

    const newmovie = await movieDatabase.movieDatabaseHelper.getOne({
        title,
        ownerId: userId,
      })

    responseHandler.statusCode = 201;
    responseHandler.message = "Movie added successfully";
    responseHandler.data = {
      movie: newmovie
    };
    return responseHandler;
  }
);

  const getSingleMovie = errorUtilities.withErrorHandling(
    async (queryDetails: Record<string, any>): Promise<any> => {
      const responseHandler: ResponseDetails = {
        statusCode: 0,
        message: "",
      };

      const { movieId } = queryDetails;

     const movie = await movieDatabase.movieDatabaseHelper.getOne({id:movieId})

      if (!movie) {
        throw errorUtilities.createError(
          "Movie not found. Please try again or contact admin",
          404
        );
      }

      responseHandler.statusCode = 200;
      responseHandler.message = "Movie fetched successfully";
      responseHandler.data = {
        movie,
      };
      return responseHandler;
    }
  );


    const getAllMoviesInDatabase = errorUtilities.withErrorHandling(
    async (queryDetails: Record<string, any>): Promise<any> => {
      const responseHandler: ResponseDetails = {
        statusCode: 0,
        message: "",
      };

      const searchTerm = queryDetails.search || "";
      
      const query = await generalHelpers.queryFilter(searchTerm);

      const size = Number(queryDetails.size) || 10;

      const skip = (Number(queryDetails.page) - 1) * size || 0;

      const filter = {
        ...query,
      };

      const options = {
        skip,
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

      const movies = await movieDatabase.movieDatabaseHelper.getMany(filter, projection, options);

      if (!movies || movies.length === 0) {
        throw errorUtilities.createError(
          "No movies found.",
          404
        );
      }

      responseHandler.statusCode = 200;
      responseHandler.message = "movies fetched successfully";
      responseHandler.data = {
        movies,
      };
      return responseHandler;
    }
  );

  const updateMovieService = errorUtilities.withErrorHandling(
    async (updatePayload: Record<string, any>): Promise<any> => {
      const responseHandler: ResponseDetails = {
        statusCode: 0,
        message: "",
      };

      if (
        (!updatePayload.title || updatePayload.productName === "") &&
        (!updatePayload.publishedDate) &&
        (!updatePayload.description || updatePayload.description === "") &&
        (!updatePayload.movieProducer || updatePayload.movieProducer === "")
      ) {
        throw errorUtilities.createError(
          "At least one field must be selected for update",
          400
        );
      }

      const { userId, movieId } = updatePayload;

      const movie:any = await movieDatabase.movieDatabaseHelper.getOne({ id: movieId });

      if (!movie) {
        throw errorUtilities.createError("Movie not found", 404);
      }

      if (movie.ownerId != userId) {
        throw errorUtilities.createError("You are not the owner of this movie, you can only edit movies you have created. Thank you.", 401);
      }

      let updateDetails: Record<string, any> = {};

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

      const newMovie: any = await movieDatabase.movieDatabaseHelper.updateOne(
        {
          id: movieId,
        },
        updateDetails
      );

      responseHandler.statusCode = 200;
      responseHandler.message = "Movie updated successfully";
      responseHandler.data = {
        movie: newMovie
      };
      return responseHandler;
    }
  );


  const getUserMovies = errorUtilities.withErrorHandling(
    async (queryDetails: Record<string, any>): Promise<any> => {
      const responseHandler: ResponseDetails = {
        statusCode: 0,
        message: "",
      };

      const searchTerm = queryDetails.search || "";

      const { userId } = queryDetails

      if(!userId){
        throw new Error("User ID is required to fetch Movies, Please login")
      }
      
      const query = await generalHelpers.queryFilter(searchTerm);

      const size = Number(queryDetails.size) || 10;

      const skip = (Number(queryDetails.page) - 1) * size || 0;

      const filter = {
        ownerId: userId,
        ...query,
      };

      const options = {
        skip,
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

      const userMovies = await movieDatabase.movieDatabaseHelper.getMany(filter, projection, options);

      if (!userMovies || userMovies.length === 0) {
        throw errorUtilities.createError(
          "You do not have any movies yet, add one.",
          404
        );
      }

      responseHandler.statusCode = 200;
      responseHandler.message = "movies fetched successfully";
      responseHandler.data = {
        movies: userMovies,
      };
      return responseHandler;
    }
  );


  const deleteSingleMovie = errorUtilities.withErrorHandling(
    async (deleteDetails: Record<string, any>): Promise<any> => {
      const responseHandler: ResponseDetails = {
        statusCode: 0,
        message: "",
      };

      const { movieId, userId } = deleteDetails;

      const movie:Record<string, any> | any = await movieDatabase.movieDatabaseHelper.getOne({ id: movieId });

      if (!movie) {
        throw errorUtilities.createError("Movie not found", 404);
      }
      if (movie.ownerId != userId) {
        throw errorUtilities.createError(
          "You are not the owner of this movie. You cannot delete the movie",
          403
        );
      }

      const payload = {
        id: movieId,
        ownerId: userId
      }

      const operations = [
        async (transaction: Transaction) => {
          await movieDatabase.movieDatabaseHelper.deleteOne(payload, transaction);
        },
        async (transaction: Transaction) => {
          await User.decrement("numberOfMoviesAdded" , { by: 1, transaction,  where: { id: userId } });
        },
      ];
      
      await performTransaction.performTransaction(operations);

      responseHandler.statusCode = 200;
      responseHandler.message = "Movie deleted successfully";
      return responseHandler;
    }
  );

  // const deleteManyMovies = errorUtilities.withErrorHandling(
  //   async (deleteDetails: Record<string, any>): Promise<any> => {
  //     const responseHandler: ResponseDetails = {
  //       statusCode: 0,
  //       message: "",
  //     };

  //     const { userId, movieIds } = deleteDetails;

  //     if (!productIds || productIds.length === 0) {
  //       throw errorUtilities.createError(
  //         "No Products selected for deletion. Please select Products.",
  //         404
  //       );
  //     }

  //     const shop = await shopDatabase.getOne(
  //       { _id: shopId, ownerId: userId },
  //       { _id: 1 }
  //     );

  //     if (!shop) {
  //       throw errorUtilities.createError("Shop not found.", 404);
  //     }

  //     const operations = [
  //       async (session: ClientSession) => {
  //     await productDatabase.deleteMany({ _id: { $in: productIds } })
  //       },
  //       async (session: ClientSession) => {
  //     await shopDatabase.updateOne({_id:shopId},{ $inc: { noOfProducts: -1 } })
  //       }
  //     ]

  //     await performTransaction(operations);

  //     responseHandler.statusCode = 200;
  //     responseHandler.message = "Products deleted successfully";
  //     return responseHandler;
  //   }
  // );




  const updateMovieImageService = errorUtilities.withErrorHandling(
    async (request: JwtPayload): Promise<any> => {
      const responseHandler: ResponseDetails = {
        statusCode: 0,
        message: "",
      };

      const moviePoster = request?.file?.path;

      if (!moviePoster) {
        throw errorUtilities.createError("Select an image please", 400);
      }

      const { movieId } = request.params;

      const movieCheck = await movieDatabase.movieDatabaseHelper.getOne(
        { id: movieId },
        { id: 1 }
      );

      if (!movieCheck) {
        throw errorUtilities.createError("Movie not found", 404);
      }

      const newMovie: any = await movieDatabase.movieDatabaseHelper.updateOne(
        {
          id: movieId,
        },
        {
          moviePoster
        }
      );

      responseHandler.statusCode = 200;
      responseHandler.message = "Movie image changed successfully";
      responseHandler.data = {
        mmovie: newMovie,
      };
      return responseHandler;
    }
  );


export default {
  userCreateMovieService,
  getSingleMovie,
  getAllMoviesInDatabase,
  updateMovieService,
  getUserMovies,
  deleteSingleMovie,
  // deleteSingleVendorProduct,
  // deleteManyVendorProductsForAShop,
  updateMovieImageService
};
