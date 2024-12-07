import express from 'express';
import { joiValidators } from "../../validations";
import { movieControllers } from "../../controllers";
import { generalAuthFunction } from "../../middlewares/authorization";
import upload from '../../utilities/uploads/cloudinary.utilities';

const router = express.Router();


router.post('/create-movie', joiValidators.inputValidator(joiValidators.createMovieSchema), generalAuthFunction, movieControllers.createMovie)
router.get('/single-movie/:movieId', generalAuthFunction, movieControllers.fetchSingleMovie)
router.get('/all-movies', movieControllers.allDatabaseMovies)
router.put('/update-movie/:movieId', generalAuthFunction, movieControllers.updateMovie)
router.get('/user-movies', generalAuthFunction, movieControllers.allUserMovies)
router.delete('/delete-single/:movieId', generalAuthFunction, movieControllers.deleteSingleUserMovie)
router.put('/update-movie-image/:movieId', generalAuthFunction, upload.single('moviePoster'), movieControllers.updateMovieImage)
router.post('/upload-image', generalAuthFunction, upload.single('image'), movieControllers.imageUpload)
export default router;