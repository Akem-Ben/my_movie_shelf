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
    publishedYear: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moviePoster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movieAuthor: {
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