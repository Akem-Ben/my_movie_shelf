"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const envKeys_1 = require("../../configurations/envKeys");
const helpers_1 = require("../../helpers");
const utilities_1 = require("../../utilities");
const validator_1 = __importDefault(require("validator"));
const sequelize_1 = require("sequelize");
const userRegistrationService = utilities_1.errorUtilities.withErrorHandling(async (userPayload) => {
    const responseHandler = {
        statusCode: 0,
        message: "",
    };
    const { email, password, phone, userName } = userPayload;
    if (!validator_1.default.isEmail(email))
        throw utilities_1.errorUtilities.createError("Invalid email", 400);
    if (!validator_1.default.isMobilePhone(phone, "any"))
        throw utilities_1.errorUtilities.createError("Invalid phone number", 400);
    const existingUserEmail = await helpers_1.userDatabase.userDatabaseHelper.getOne({
        email,
    });
    if (existingUserEmail)
        throw utilities_1.errorUtilities.createError("User already exists with this email", 400);
    const existingUserName = await helpers_1.userDatabase.userDatabaseHelper.getOne({
        userName,
    });
    if (existingUserName)
        throw utilities_1.errorUtilities.createError("This username is unavailable, please choose another", 400);
    const signupPayload = {
        ...userPayload,
        id: (0, uuid_1.v4)(),
        isVerified: false,
        role: "user",
        password: await helpers_1.generalHelpers.hashPassword(password),
    };
    const newUser = await helpers_1.userDatabase.userDatabaseHelper.create(signupPayload);
    const tokenPayload = {
        id: newUser.id,
        role: newUser.role,
        email: newUser.email,
    };
    const verificationToken = await helpers_1.generalHelpers.generateTokens(tokenPayload, "1h");
    await utilities_1.mailUtilities.sendMail(newUser.email, "Click the button below to verify your account", "PLEASE VERIFY YOUR ACCOUNT", `${envKeys_1.USERS_APP_BASE_URL}/verification/${verificationToken}`, "Verify");
    const userWithoutPassword = await helpers_1.userDatabase.userDatabaseHelper.extractUserDetails(newUser);
    delete userWithoutPassword.refreshToken;
    responseHandler.statusCode = 201;
    responseHandler.message =
        "User registered successfully. A verification mail has been sent to your account, please click on the link in the mail to verify your account. The link is valid for one hour only. Thank you.";
    responseHandler.data = userWithoutPassword;
    return responseHandler;
});
const userLoginService = utilities_1.errorUtilities.withErrorHandling(async (loginPayload) => {
    const responseHandler = {
        statusCode: 0,
        message: "",
    };
    const { loginKey, password } = loginPayload;
    const existingUser = await helpers_1.userDatabase.userDatabaseHelper.getOne({
        [sequelize_1.Op.or]: [
            { email: loginKey },
            { userName: loginKey },
        ],
    });
    if (!existingUser) {
        throw utilities_1.errorUtilities.createError("Invalid email/username", 400);
    }
    // if(!existingUser.isVerified){
    //     throw errorUtilities.createError(`User is not verified. Click on the link in the verification mail sent to ${existingUser.email} or request for another verification mail`, 400);
    // }
    const verifyPassword = await helpers_1.generalHelpers.validatePassword(password, existingUser.password);
    if (!verifyPassword) {
        throw utilities_1.errorUtilities.createError("Incorrect Password", 400);
    }
    const tokenPayload = {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role
    };
    const accessToken = await helpers_1.generalHelpers.generateTokens(tokenPayload, "2h");
    const refreshToken = await helpers_1.generalHelpers.generateTokens(tokenPayload, "30d");
    existingUser.refreshToken = refreshToken;
    await existingUser.save();
    const userWithoutPassword = await helpers_1.userDatabase.userDatabaseHelper.extractUserDetails(existingUser);
    delete userWithoutPassword.refreshToken;
    const dateDetails = helpers_1.generalHelpers.dateFormatter(new Date());
    const mailMessage = `Hi ${existingUser.fullName}, <br /> There was a login to your account on ${dateDetails.date} by ${dateDetails.time}. If you did not initiate this login, click the button below to restrict your account. If it was you, please ignore. The link will expire in one hour.`;
    const mailLink = `${envKeys_1.USERS_APP_BASE_URL}/restrict-account/${existingUser.id}`;
    const mailButtonText = 'Restrict Account';
    const mailSubject = "Activity Detected on Your Account";
    await utilities_1.mailUtilities.sendMail(existingUser.email, mailMessage, mailSubject, mailLink, mailButtonText);
    responseHandler.statusCode = 200;
    responseHandler.message = `Welcome back ${userWithoutPassword.fullName}`;
    responseHandler.data = {
        user: userWithoutPassword,
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
    return responseHandler;
});
exports.default = {
    userRegistrationService,
    userLoginService
};
