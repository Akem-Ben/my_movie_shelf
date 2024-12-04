"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validations_1 = require("../../validations");
const controllers_1 = require("../../controllers");
const router = express_1.default.Router();
router.post('/create-user', validations_1.joiValidators.inputValidator(validations_1.joiValidators.userRegisterSchema), controllers_1.userAuthController.userRegistration);
router.post('/login', validations_1.joiValidators.inputValidator(validations_1.joiValidators.loginUserSchema), controllers_1.userAuthController.userLogin);
exports.default = router;
