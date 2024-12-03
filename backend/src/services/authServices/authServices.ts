import { v4 } from "uuid";
import { USERS_APP_BASE_URL } from "../../configurations/envKeys";
import { userDatabase, generalHelpers } from "../../helpers";
import { ResponseDetails } from "../../types/generalTypes";
import { errorUtilities, mailUtilities } from "../../utilities";
import validator from "validator";

const userRegistrationService = errorUtilities.withErrorHandling(
  async (userPayload: Record<string, any>): Promise<any> => {
    const responseHandler: ResponseDetails = {
      statusCode: 0,
      message: "",
    };

    const { email, password, phone } = userPayload;

    if (!validator.isEmail(email))
      throw errorUtilities.createError("Invalid email", 400);

    if (!validator.isMobilePhone(phone, "any"))
      throw errorUtilities.createError("Invalid phone number", 400);

    const existingUser = await userDatabase.userDatabaseHelper.getOne(email);

    if (existingUser)
      throw errorUtilities.createError(
        "User already exists with this email",
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
      `${USERS_APP_BASE_URL}/verification/${verificationToken}, Verify`
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

export default {
    userRegistrationService,
}