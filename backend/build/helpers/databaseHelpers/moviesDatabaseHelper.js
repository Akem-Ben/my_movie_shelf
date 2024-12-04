"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movieModel_1 = __importDefault(require("../../models/movie/movieModel"));
const movieDatabaseHelper = {
    create: async (data, transaction) => {
        try {
            const newMovie = await movieModel_1.default.create(data, { transaction });
            return newMovie;
        }
        catch (error) {
            throw new Error(`Error creating Movie: ${error.message}`);
        }
    },
    updateOne: async (filter, update) => {
        try {
            const movie = await movieModel_1.default.findOne({ where: filter });
            if (!movie)
                throw new Error("Movie not found");
            await movie.update(update);
            return movie;
        }
        catch (error) {
            throw new Error(`Error updating Movie: ${error.message}`);
        }
    },
    updateMany: async (filter, update) => {
        try {
            const [affectedRows] = await movieModel_1.default.update(update, { where: filter });
            return { affectedRows };
        }
        catch (error) {
            throw new Error(`Error updating Movies: ${error.message}`);
        }
    },
    deleteOne: async (filter, transaction) => {
        try {
            const movie = await movieModel_1.default.findOne({ where: filter, transaction });
            if (!movie)
                throw new Error("Movie not found");
            await movie.destroy();
            return movie;
        }
        catch (error) {
            throw new Error(`Error deleting Movie: ${error.message}`);
        }
    },
    deleteMany: async (filter) => {
        try {
            const affectedRows = await movieModel_1.default.destroy({ where: filter });
            return { affectedRows };
        }
        catch (error) {
            throw new Error(`Error deleting Movies: ${error.message}`);
        }
    },
    getOne: async (filter, projection) => {
        try {
            const movie = await movieModel_1.default.findOne({
                where: filter,
                attributes: projection,
            });
            return movie;
        }
        catch (error) {
            throw new Error(`Error fetching Movie: ${error.message}`);
        }
    },
    getMany: async (filter, projection, options) => {
        try {
            const movies = await movieModel_1.default.findAll({
                where: filter,
                attributes: projection,
                ...options,
            });
            return movies;
        }
        catch (error) {
            throw new Error(`Error fetching Movies: ${error.message}`);
        }
    },
    extractMovieDetails: async (movieData) => {
        try {
            return {
                id: movieData.id,
                title: movieData.title,
                publishedYear: movieData.publishedYear,
                description: movieData.description,
                moviePoster: movieData.moviePoster,
                movieProducer: movieData.movieProducer
            };
        }
        catch (error) {
            throw new Error(`Error fetching Movies: ${error.message}`);
        }
    },
};
exports.default = {
    movieDatabaseHelper
};
