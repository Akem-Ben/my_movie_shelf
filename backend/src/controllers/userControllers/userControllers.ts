import { Request, Response, NextFunction } from "express";
import { userAuthService } from "../../services";
import { responseUtilities } from "../../utilities";

const userRegistration = async (
    request: Request,
    response: Response
  ): Promise<any> => {
    const newUser: any = await userAuthService.userRegistrationService(
      request.body
    );
  
    return responseUtilities.responseHandler(
      response,
      newUser.message,
      newUser.statusCode,
      newUser.details,
      newUser.data
    );
  };



export default {
    userRegistration
}