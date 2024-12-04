"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../models/users/userModel"));
const userDatabaseHelper = {
    create: async (data) => {
        try {
            const newUser = await userModel_1.default.create(data);
            return newUser;
        }
        catch (error) {
            throw new Error(`Error creating User: ${error.message}`);
        }
    },
    updateOne: async (filter, update, transaction) => {
        try {
            const user = await userModel_1.default.findOne({ where: filter });
            if (!user)
                throw new Error("User not found");
            await user.update(update);
            return user;
        }
        catch (error) {
            throw new Error(`Error updating User: ${error.message}`);
        }
    },
    updateMany: async (filter, update) => {
        try {
            const [affectedRows] = await userModel_1.default.update(update, { where: filter });
            return { affectedRows };
        }
        catch (error) {
            throw new Error(`Error updating Users: ${error.message}`);
        }
    },
    deleteOne: async (filter) => {
        try {
            const user = await userModel_1.default.findOne({ where: filter });
            if (!user)
                throw new Error("User not found");
            await user.destroy();
            return user;
        }
        catch (error) {
            throw new Error(`Error deleting User: ${error.message}`);
        }
    },
    deleteMany: async (filter) => {
        try {
            const affectedRows = await userModel_1.default.destroy({ where: filter });
            return { affectedRows };
        }
        catch (error) {
            throw new Error(`Error deleting Users: ${error.message}`);
        }
    },
    getOne: async (filter, projection) => {
        try {
            const user = await userModel_1.default.findOne({
                where: filter,
                attributes: projection,
            });
            return user;
        }
        catch (error) {
            throw new Error(`Error fetching User: ${error.message}`);
        }
    },
    getMany: async (filter, projection, options) => {
        try {
            const users = await userModel_1.default.findAll({
                where: filter,
                attributes: projection,
                ...options,
            });
            return users;
        }
        catch (error) {
            throw new Error(`Error fetching Users: ${error.message}`);
        }
    },
    extractUserDetails: async (userData) => {
        try {
            return {
                email: userData.email,
                fullName: userData.fullName,
                role: userData.role,
                phone: userData.phone,
                isVerified: userData.isVerified,
                refreshToken: userData.refreshToken,
                noOfMovies: userData.numberOfMoviesAdded
            };
        }
        catch (error) {
            throw new Error(`Error fetching Users: ${error.message}`);
        }
    },
};
exports.default = {
    userDatabaseHelper,
};
