"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalAuthFunction = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envKeys_1 = require("../configurations/envKeys");
const helpers_1 = require("../helpers");
const generalAuthFunction = async (request, response, next) => {
    try {
        const authorizationHeader = request.headers.authorization;
        const refreshToken = request.headers['x-refresh-token'];
        if (!authorizationHeader) {
            return response.status(401).json({
                message: 'Please login again',
            });
        }
        const authorizationToken = authorizationHeader.split(' ')[1];
        if (!authorizationToken) {
            return response.status(401).json({
                status: 'Failed',
                message: 'Login required',
            });
        }
        let verifiedUser;
        try {
            verifiedUser = jsonwebtoken_1.default.verify(authorizationToken, `${envKeys_1.APP_SECRET}`);
        }
        catch (error) {
            if (error.message === 'jwt expired') {
                if (!refreshToken) {
                    return response.status(401).json({
                        status: 'error',
                        message: 'Refresh Token not found. Please login again.',
                    });
                }
                let refreshVerifiedUser;
                try {
                    refreshVerifiedUser = jsonwebtoken_1.default.verify(refreshToken, `${envKeys_1.APP_SECRET}`);
                }
                catch (refreshError) {
                    return response.status(401).json({
                        status: 'error',
                        message: 'Refresh Token Expired. Please login again.',
                    });
                }
                const filter = { id: refreshVerifiedUser.id };
                const projection = { refreshToken: 1, isVerified: 1 };
                const userDetails = await helpers_1.userDatabase.userDatabaseHelper.getOne(filter, projection);
                const compareRefreshTokens = refreshToken === userDetails.refreshToken;
                if (compareRefreshTokens === false) {
                    return response.status(401).json({
                        status: 'error',
                        message: 'Please login again.',
                    });
                }
                const tokenPayload = {
                    id: refreshVerifiedUser.id,
                    email: refreshVerifiedUser.email,
                    role: refreshVerifiedUser.role
                };
                const newAccessToken = await helpers_1.generalHelpers.generateTokens(tokenPayload, '2h');
                const newRefreshToken = await helpers_1.generalHelpers.generateTokens(tokenPayload, '30d');
                response.setHeader('x-access-token', newAccessToken);
                response.setHeader('x-refresh-token', newRefreshToken);
                await helpers_1.userDatabase.userDatabaseHelper.updateOne({ id: refreshVerifiedUser.id }, { refreshToken });
                request.user = refreshVerifiedUser;
                return next();
            }
            return response.status(401).json({
                status: 'error',
                message: `Login Again, Invalid Token: ${error.message}`,
            });
        }
        const filter = { id: verifiedUser.id };
        const projection = { isVerified: 1 };
        const userDetails = await helpers_1.userDatabase.userDatabaseHelper.getOne(filter, projection);
        request.user = verifiedUser;
        return next();
    }
    catch (error) {
        return response.status(500).json({
            status: 'error',
            message: `Internal Server Error: ${error.message}`,
        });
    }
};
exports.generalAuthFunction = generalAuthFunction;
