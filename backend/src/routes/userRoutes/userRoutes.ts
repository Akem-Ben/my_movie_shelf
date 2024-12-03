import express from 'express';
import { joiValidators } from "../../validations";
import { userAuthController } from "../../controllers";


const router = express.Router();

router.post('/create-user', joiValidators.inputValidator(joiValidators.userRegisterSchemaViaEmail), userAuthController.userRegistration)

export default router;