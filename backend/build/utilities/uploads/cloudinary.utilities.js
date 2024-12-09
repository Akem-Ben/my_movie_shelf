"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloud = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const envKeys_1 = require("../../configurations/envKeys");
dotenv_1.default.config();
exports.cloud = cloudinary_1.v2.config({
    cloud_name: envKeys_1.CLOUDINARY_NAME,
    api_key: envKeys_1.CLOUDINARY_API_KEY,
    api_secret: envKeys_1.CLOUDINARY_API_SECRET
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, file) => {
        try {
            return {
                folder: "my_movie_shelf",
            };
        }
        catch (error) {
            console.error("Cloudinary Storage Error:", error.message);
            throw new Error("Failed to configure Cloudinary storage");
        }
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        try {
            if (file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/webp" ||
                file.mimetype === "image/avif") {
                cb(null, true);
            }
            else {
                console.error("Unsupported file format:", file.mimetype);
                cb(null, false);
                return cb(new Error("Only .png, .jpg, .jpeg, .webp, .avif formats allowed"));
            }
        }
        catch (error) {
            console.log('errs', error);
        }
    }
});
exports.default = upload;
