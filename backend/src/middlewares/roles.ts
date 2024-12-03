import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";


export enum Roles {
    Admin = "Admin",
    User = "User",
  }



  export function rolePermit(roles: string[]) {
    return async (request: JwtPayload, response: Response, next: NextFunction): Promise<any> => {
     
      const userRole = request.user.role
      const userId = request.user.id
      if (!userRole || !userId) {
        return response.status(401).json({
          status: 'error',
          message: 'User Not Authorized. Please login again',
        });
      }
  
      const isAuthorized = roles.includes(userRole);
  
      if (!isAuthorized) {
        return response.status(401).json({
          status: 'error',
          message: 'User Not Permitted to execute this action',
        });
      }
  
      next();
    };
  }