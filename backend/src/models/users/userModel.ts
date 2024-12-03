import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/database";
import { UserAttributes } from "types/modelTypes";

export class User extends Model<UserAttributes> {}

User.init(
  {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    profileImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false
    },

    numberOfMoviesAdded: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password is required",
        },
      },
    },

    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true
    },

    

  },
  {
    sequelize: database,
    tableName: "User",
  }
);

export default User;