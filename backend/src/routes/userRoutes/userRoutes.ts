import express from 'express';
import { joiValidators } from "../../validations";
import { userAuthController } from "../../controllers";


const router = express.Router();

router.post('/create-user', joiValidators.inputValidator(joiValidators.userRegisterSchema), userAuthController.userRegistration)
router.post('/login', joiValidators.inputValidator(joiValidators.loginUserSchema), userAuthController.userLogin)

export default router;