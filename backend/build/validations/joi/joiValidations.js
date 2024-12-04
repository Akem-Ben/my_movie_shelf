"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/;
const inputValidator = (schema) => {
    return async (request, response, next) => {
        try {
            const { error } = schema.validate(request.body);
            if (error) {
                return response.status(400).json({
                    status: 'error',
                    message: `${error.details[0].message.replace(/["\\]/g, '')}`,
                });
            }
            return next();
        }
        catch (err) {
            return response.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }
    };
};
//User Auth
const userRegisterSchema = joi_1.default.object({
    fullName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).pattern(PASSWORD_PATTERN).required().messages({
        'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.'
    }),
    phone: joi_1.default.string().required(),
    userName: joi_1.default.string().required(),
    profileImage: joi_1.default.string().required()
});
const loginUserSchema = joi_1.default.object({
    loginKey: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
const createMovieSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    publishedDate: joi_1.default.date().required(),
    description: joi_1.default.string().required(),
    moviePoster: joi_1.default.string().required(),
    movieProducer: joi_1.default.string().required()
});
exports.default = {
    userRegisterSchema,
    loginUserSchema,
    createMovieSchema,
    inputValidator
};
