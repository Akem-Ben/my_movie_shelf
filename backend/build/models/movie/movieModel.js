"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../configurations/database");
//action, romance, sci-fi, thriler, other, drama, k-drama
class Movie extends sequelize_1.Model {
}
exports.Movie = Movie;
Movie.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    publishedDate: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    moviePoster: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ownerId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    movieProducer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.database,
    tableName: "Movie",
});
exports.default = Movie;
