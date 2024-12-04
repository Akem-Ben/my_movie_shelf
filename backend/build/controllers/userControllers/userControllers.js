"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
const utilities_1 = require("../../utilities");
const userRegistration = async (request, response) => {
    const newUser = await services_1.userAuthService.userRegistrationService(request.body);
    return utilities_1.responseUtilities.responseHandler(response, newUser.message, newUser.statusCode, newUser.details, newUser.data);
};
const userLogin = async (request, response) => {
    const loggedInUser = await services_1.userAuthService.userLoginService(request.body);
    if (loggedInUser.statusCode === 200) {
        response
            .header("x-access-token", loggedInUser.data.accessToken)
            .header("x-refresh-token", loggedInUser.data.refreshToken);
    }
    return utilities_1.responseUtilities.responseHandler(response, loggedInUser.message, loggedInUser.statusCode, loggedInUser.details, loggedInUser.data);
};
exports.default = {
    userRegistration,
    userLogin
};
