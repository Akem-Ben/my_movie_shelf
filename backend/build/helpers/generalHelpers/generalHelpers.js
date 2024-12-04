"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envKeys_1 = require("../../configurations/envKeys");
const utilities_1 = require("../../utilities");
const sequelize_1 = require("sequelize");
/**
 * Hash Password:
 * This function hashes a given password using bcrypt with a salt factor of 5.
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} - The hashed password.
 * @throws {Error} - Throws an error if there is an issue with hashing the password.
 */
const hashPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(5);
    const passwordHash = await bcryptjs_1.default.hash(password, salt);
    return passwordHash;
};
/**
 * Validate Password:
 * This function compares a given password with a hashed user password using bcrypt.
 * @param {string} password - The password to be validated.
 * @param {string} userPassword - The hashed user password to compare against.
 * @returns {Promise<boolean>} - Returns true if the password matches, otherwise false.
 * @throws {Error} - Throws an error if there is an issue with validating the password.
 */
const validatePassword = async (password, userPassword) => {
    return await bcryptjs_1.default.compare(password, userPassword);
};
/**
 * Generate Token:
 * This function generates a JSON Web Token (JWT) with a given payload and an expiration time of 15 hours.
 * @param {Record<string, string>} payload - The payload to be included in the token.
 * @returns {Promise<string>} - The generated token.
 * @throws {Error} - Throws an error if there is an issue with generating the token.
 */
const generateTokens = async (payload, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, `${envKeys_1.APP_SECRET}`, { expiresIn: expiresIn });
};
/**
 * Verify Token:
 * This function verifies a given JSON Web Token (JWT) using the application secret.
 * @param {string} token - The token to be verified.
 * @returns {Promise<object>} - The decoded token payload if verification is successful.
 * @throws {Error} - Throws an error if there is an issue with verifying the token.
 */
const verifyRegistrationToken = async (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, `${envKeys_1.APP_SECRET}`);
    }
    catch (error) {
        if (error.message === 'jwt expired') {
            throw utilities_1.errorUtilities.createError('Please request a new verification email', 401);
        }
        throw utilities_1.errorUtilities.createUnknownError(error);
    }
};
const dateFormatter = (dateString) => {
    const year = dateString.getFullYear();
    const month = dateString.getMonth() + 1;
    const day = dateString.getDate();
    const hours = dateString.getHours();
    const minutes = dateString.getMinutes();
    const seconds = dateString.getSeconds();
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return {
        date,
        time
    };
};
const refreshUserToken = async (userRefreshToken) => {
    try {
        let responseDetails = {
            statusCode: 0,
            message: '',
        };
        const decodedToken = jsonwebtoken_1.default.verify(userRefreshToken, `${envKeys_1.APP_SECRET}`);
        if (!decodedToken) {
            responseDetails.statusCode = 401;
            responseDetails.message = 'Invalid Refresh Token';
            return responseDetails;
        }
        const userPayload = {
            id: decodedToken.id,
            email: decodedToken.email,
        };
        const newAccessToken = await generateTokens(userPayload, '3h');
        const newRefreshToken = await generateTokens(userPayload, '30d');
        responseDetails.statusCode = 200;
        responseDetails.message = 'Refresh Token is valid, new tokens generated';
        responseDetails.data = {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
        return responseDetails;
    }
    catch (error) {
        if (error.message === 'jwt expired') {
            let responseDetails = {
                statusCode: 0,
                message: '',
            };
            responseDetails.statusCode = 403;
            responseDetails.message = 'Please login again';
            return responseDetails;
        }
    }
};
//This function is used to manage queries (request.query) for the application  
const queryFilter = async (searchTerm) => {
    const query = {};
    if (searchTerm) {
        if (!isNaN(Number(searchTerm))) {
            query[sequelize_1.Op.or] = [
                { publishedDate: Number(searchTerm) },
            ];
        }
        else {
            query[sequelize_1.Op.or] = [
                { title: { [sequelize_1.Op.iLike]: `%${searchTerm.toLowerCase()}%` } },
                { movieProducer: { [sequelize_1.Op.iLike]: `%${searchTerm.toLowerCase()}%` } },
            ];
        }
    }
    return query;
};
exports.default = {
    hashPassword,
    validatePassword,
    generateTokens,
    refreshUserToken,
    dateFormatter,
    verifyRegistrationToken,
    queryFilter
};
