import { v4 } from "uuid";
import { USERS_APP_BASE_URL } from "../../configurations/envKeys";
import { userDatabase, generalHelpers } from "../../helpers";
import { ResponseDetails } from "../../types/generalTypes";
import { errorUtilities, mailUtilities } from "../../utilities";
import validator from "validator";
import { Op } from "sequelize";
import { UserAttributes } from "../../types/modelTypes";

const userRegistrationService = errorUtilities.withErrorHandling(
  async (userPayload: Record<string, any>): Promise<any> => {
    const responseHandler: ResponseDetails = {
      statusCode: 0,
      message: "",
    };

    const { email, password, phone, userName } = userPayload;

    if (!validator.isEmail(email))
      throw errorUtilities.createError("Invalid email", 400);

    if (!validator.isMobilePhone(phone, "any"))
      throw errorUtilities.createError("Invalid phone number", 400);

    const existingUserEmail = await userDatabase.userDatabaseHelper.getOne({
      email,
    });

    if (existingUserEmail)
      throw errorUtilities.createError(
        "User already exists with this email",
        400
      );

    const existingUserName = await userDatabase.userDatabaseHelper.getOne({
      userName,
    });

    if (existingUserName)
      throw errorUtilities.createError(
        "This username is unavailable, please choose another",
        400
      );

    const signupPayload = {
      ...userPayload,
      id: v4(),
      isVerified: false,
      role: "user",
      password: await generalHelpers.hashPassword(password),
    };

    const newUser: Record<string, any> =
      await userDatabase.userDatabaseHelper.create(signupPayload);

    const tokenPayload = {
      id: newUser.id,
      role: newUser.role,
      email: newUser.email,
    };

    const verificationToken = await generalHelpers.generateTokens(
      tokenPayload,
      "1h"
    );

    await mailUtilities.sendMail(
      newUser.email,
      "Click the button below to verify your account",
      "PLEASE VERIFY YOUR ACCOUNT",
      `${USERS_APP_BASE_URL}/verification/${verificationToken}`,
      "Verify"
    );

    const userWithoutPassword =
      await userDatabase.userDatabaseHelper.extractUserDetails(newUser);

    delete userWithoutPassword.refreshToken;

    responseHandler.statusCode = 201;
    responseHandler.message =
      "User registered successfully. A verification mail has been sent to your account, please click on the link in the mail to verify your account. The link is valid for one hour only. Thank you.";
    responseHandler.data = userWithoutPassword;
    return responseHandler;
  }
);


const userLoginService = errorUtilities.withErrorHandling(async (loginPayload: Record<string, any>) => {

    const responseHandler: ResponseDetails = {
      statusCode: 0,
      message: "",
    };

    const { loginKey, password } = loginPayload;

    const existingUser:any = await userDatabase.userDatabaseHelper.getOne({
        [Op.or]: [
          { email: loginKey },
          { userName: loginKey },
        ],
      })
  
      if (!existingUser) {
        throw errorUtilities.createError("Invalid email/username", 400);
      }

    if(!existingUser.isVerified){
        throw errorUtilities.createError(`User is not verified. Click on the link in the verification mail sent to ${existingUser.email} or request for another verification mail`, 400);
    }

    const verifyPassword = await generalHelpers.validatePassword(
      password,
      existingUser.password
    );

    if (!verifyPassword) {
        throw errorUtilities.createError("Incorrect Password", 400);
    }

    const tokenPayload = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role
    };

    const accessToken = await generalHelpers.generateTokens(tokenPayload, "2h");
    const refreshToken = await generalHelpers.generateTokens(tokenPayload,"30d");

    existingUser.refreshToken = refreshToken;

    await existingUser.save();

    const userWithoutPassword = await userDatabase.userDatabaseHelper.extractUserDetails(existingUser);

    delete userWithoutPassword.refreshToken

    const dateDetails = generalHelpers.dateFormatter(new Date())
    const mailMessage = `Hi ${existingUser.fullName}, <br /> There was a login to your account on ${dateDetails.date} by ${dateDetails.time}. If you did not initiate this login, click the button below to restrict your account. If it was you, please ignore. The link will expire in one hour.`;
    const mailLink = `${USERS_APP_BASE_URL}/restrict-account/${existingUser.id}`
    const mailButtonText = 'Restrict Account'
    const mailSubject = "Activity Detected on Your Account";

    await mailUtilities.sendMail(existingUser.email, mailMessage, mailSubject, mailLink, mailButtonText)

    responseHandler.statusCode = 200;

    responseHandler.message = `Welcome back ${userWithoutPassword.fullName}`;

    responseHandler.data = {
      user: userWithoutPassword,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return responseHandler;

});


export default {
  userRegistrationService,
  userLoginService
};
