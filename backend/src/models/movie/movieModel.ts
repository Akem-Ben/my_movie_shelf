import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/database";
import { MovieAttributes } from "types/modelTypes";


export class Movie extends Model<MovieAttributes> {}

Movie.init(
  {

    id: {
    type: DataTypes.UUID,
    primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    publishedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    moviePoster: {
      type: DataTypes.STRING,
      allowNull: false,

    },

    ownerId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    movieProducer: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  },
  {
    sequelize: database,
    tableName: "Movie",
  }
);

export default Movie;