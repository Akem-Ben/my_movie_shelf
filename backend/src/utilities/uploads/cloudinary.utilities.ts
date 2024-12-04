import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import {Request, Response} from 'express';
import { CLOUDINARY_NAME, API_KEY, API_SECRET } from '../../configurations/envKeys';

dotenv.config()

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      try {
        return {
          folder: "my_movie_shelf",
        };
      } catch (error: any) {
        console.error("Cloudinary Storage Error:", error.message);
        throw new Error("Failed to configure Cloudinary storage");
      }
    },
  });
  


const upload = multer({
    storage: storage,
    fileFilter: (req: Request, file, cb) => {
        try{
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/webp" ||
        file.mimetype === "image/avif"
      ) {
        cb(null, true);
      } else {
        console.error("Unsupported file format:", file.mimetype);
        cb(null, false);
        return cb(new Error("Only .png, .jpg, .jpeg, .webp, .avif formats allowed"));
    }
    }catch(error:any){
        console.log('errs', error)
    }

}
  });
  

export default upload