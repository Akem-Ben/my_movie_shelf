"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesServices = exports.userAuthService = void 0;
const authServices_1 = __importDefault(require("./authServices/authServices"));
exports.userAuthService = authServices_1.default;
const moviesServices_1 = __importDefault(require("./movieServices/moviesServices"));
exports.moviesServices = moviesServices_1.default;
