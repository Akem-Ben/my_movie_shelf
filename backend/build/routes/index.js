"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes/userRoutes"));
const movieRoutes_1 = __importDefault(require("./movieRoutes/movieRoutes"));
const rootRouter = (0, express_1.Router)();
rootRouter.use('/users', userRoutes_1.default);
rootRouter.use('/movies', movieRoutes_1.default);
exports.default = rootRouter;
