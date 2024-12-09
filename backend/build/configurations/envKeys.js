"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PORT = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_NAME = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_NAME = exports.USERS_APP_BASE_URL = exports.GMAIL_PASSWORD = exports.GMAIL_USER = exports.PORT = exports.DATABASE_URI = exports.APP_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.APP_SECRET = process.env.APP_SECRET;
exports.DATABASE_URI = process.env.DATABASE_URI;
exports.PORT = process.env.PORT;
exports.GMAIL_USER = process.env.GMAIL_USER;
exports.GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
exports.USERS_APP_BASE_URL = process.env.USERS_APP_BASE_URL;
exports.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
exports.DB_NAME = process.env.DB_NAME;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = process.env.DB_PORT;
