import Joi from 'joi';
import {Request, Response, NextFunction} from 'express';

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/


const inputValidator = (schema: Joi.Schema):any => {
    return async (request: Request, response: Response, next: NextFunction):Promise<any> => {
      try {
        const { error } = schema.validate(request.body);
        if (error) {
          return response.status(400).json({
            status: 'error',
            message: `${error.details[0].message.replace(/["\\]/g, '')}`,
          });
        }
        return next();
      } catch (err) {
        return response.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
      }
    };
  };

//User Auth
const userRegisterSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(PASSWORD_PATTERN).required().messages({
    'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.'
  }),
  phone: Joi.string().required(),
  userName: Joi.string().required(),
  profileImage: Joi.string().required()
});


const loginUserSchema = Joi.object({
    loginKey: Joi.string().required(),
    password: Joi.string().required()
})

export default {
  userRegisterSchema,
  loginUserSchema,
  inputValidator
}