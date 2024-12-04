"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieControllers = exports.userAuthController = void 0;
const userControllers_1 = __importDefault(require("./userControllers/userControllers"));
exports.userAuthController = userControllers_1.default;
const movieControllers_1 = __importDefault(require("./movieControllers/movieControllers"));
exports.movieControllers = movieControllers_1.default;
