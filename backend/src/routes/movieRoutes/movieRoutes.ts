import express from 'express';
import { joiValidators } from "../../validations";
import { movieControllers } from "../../controllers";
import { generalAuthFunction } from "../../middlewares/authorization";


const router = express.Router();


router.post('/create-movie', joiValidators.inputValidator(joiValidators.createMovieSchema), generalAuthFunction, movieControllers.createMovie)

export default router;