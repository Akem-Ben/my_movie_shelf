import { Transaction } from "sequelize";
import Movie from "../../models/movie/movieModel";

const movieDatabaseHelper = {

  create: async (data: any, transaction?: Transaction) => {
    try {
      const newMovie = await Movie.create(data, { transaction });
      return newMovie;
    } catch (error: any) {
      throw new Error(`Error creating Movie: ${error.message}`);
    }
  },
  

  updateOne: async (filter: any, update: any) => {
    try {
      const movie = await Movie.findOne({ where: filter });
      if (!movie) throw new Error("Movie not found");
      await movie.update(update);
      return movie;
    } catch (error: any) {
      throw new Error(`Error updating Movie: ${error.message}`);
    }
  },

  updateMany: async (filter: any, update: any) => {
    try {
      const [affectedRows] = await Movie.update(update, { where: filter });
      return { affectedRows };
    } catch (error: any) {
      throw new Error(`Error updating Movies: ${error.message}`);
    }
  },

  deleteOne: async (filter: any) => {
    try {
      const movie = await Movie.findOne({ where: filter });
      if (!movie) throw new Error("Movie not found");
      await movie.destroy();
      return movie;
    } catch (error: any) {
      throw new Error(`Error deleting Movie: ${error.message}`);
    }
  },

  deleteMany: async (filter: any) => {
    try {
      const affectedRows = await Movie.destroy({ where: filter });
      return { affectedRows };
    } catch (error: any) {
      throw new Error(`Error deleting Movies: ${error.message}`);
    }
  },

  getOne: async (filter: Record<string, any>, projection?: any) => {
    try {
      const movie = await Movie.findOne({
        where: filter,
        attributes: projection,
      });
      return movie;
    } catch (error: any) {
      throw new Error(`Error fetching Movie: ${error.message}`);
    }
  },

  getMany: async (filter: any, projection?: any, options?: any) => {
    try {
      const movies = await Movie.findAll({
        where: filter,
        attributes: projection,
        ...options,
      });
      return movies;
    } catch (error: any) {
      throw new Error(`Error fetching Movies: ${error.message}`);
    }
  },

  extractMovieDetails: async (movieData: Record<string, any>) => {
    try {
      return {
        id: movieData.id,
        title: movieData.email,
        publishedYear: movieData.fullName,
        description: movieData.role,
        moviePoster: movieData.phone,
        movieProducer: movieData.isVerified
      };
    } catch (error: any) {
      throw new Error(`Error fetching Movies: ${error.message}`);
    }
  },
  
};

export default {
    movieDatabaseHelper
};
