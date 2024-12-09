"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validations_1 = require("../../validations");
const controllers_1 = require("../../controllers");
const authorization_1 = require("../../middlewares/authorization");
const cloudinary_utilities_1 = __importDefault(require("../../utilities/uploads/cloudinary.utilities"));
const router = express_1.default.Router();
router.post('/create-movie', validations_1.joiValidators.inputValidator(validations_1.joiValidators.createMovieSchema), authorization_1.generalAuthFunction, controllers_1.movieControllers.createMovie);
router.get('/single-movie/:movieId', authorization_1.generalAuthFunction, controllers_1.movieControllers.fetchSingleMovie);
router.get('/all-movies', controllers_1.movieControllers.allDatabaseMovies);
router.put('/update-movie/:movieId', authorization_1.generalAuthFunction, controllers_1.movieControllers.updateMovie);
router.get('/user-movies', authorization_1.generalAuthFunction, controllers_1.movieControllers.allUserMovies);
router.delete('/delete-single/:movieId', authorization_1.generalAuthFunction, controllers_1.movieControllers.deleteSingleUserMovie);
router.put('/update-movie-image/:movieId', authorization_1.generalAuthFunction, cloudinary_utilities_1.default.single('image'), controllers_1.movieControllers.updateMovieImage);
router.post('/upload-image', authorization_1.generalAuthFunction, cloudinary_utilities_1.default.single('image'), controllers_1.movieControllers.imageUpload);
exports.default = router;
