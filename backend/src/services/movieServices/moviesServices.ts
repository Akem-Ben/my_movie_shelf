import { v4 } from "uuid";
import { USERS_APP_BASE_URL } from "../../configurations/envKeys";
import { movieDatabase, generalHelpers, userDatabase } from "../../helpers";
import { ResponseDetails } from "../../types/generalTypes";
import { errorUtilities, mailUtilities } from "../../utilities";
import { JwtPayload } from "jsonwebtoken";
import validator from "validator";
import sequelize, { Op } from "sequelize";


const userCreateMovieService = errorUtilities.withErrorHandling(
    async (
      moviePayload: Record<string, any>,
      request: JwtPayload
    ): Promise<Record<string, any>> => {
        
      const responseHandler: ResponseDetails = {
        statusCode: 0,
        message: "",
      };
  
      const {
        title
      } = moviePayload;

      const userId = request.user.id
  
      const movie = await movieDatabase.movieDatabaseHelper.getOne({
        title,
        ownerId: userId,
      });
  
      if (movie) {
        throw errorUtilities.createError(
          `You already have a title with this name in your shop. If you have different movies with the same title, you can include the movie name with the date of launch as the name. Example: ${title} 2014`,
          400
        );
      }

      const payload = {
        ...moviePayload, ownerId: userId
      };
  
      const newmovie = await movieDatabase.movieDatabaseHelper.create(payload);
  
      await userDatabase.userDatabaseHelper.updateOne(
        { numberOfMoviesAdded: sequelize.literal('numberOfMoviesAdded + 1') },
        { where: { id: userId } }
      );
  
      responseHandler.statusCode = 201;
      responseHandler.message = "Movie added successfully";
      responseHandler.data = {
        movie: newmovie,
      };
      return responseHandler;
    }
  );
  
//   const updateProductService = errorUtilities.withErrorHandling(
//     async (updatePayload: Record<string, any>): Promise<any> => {
//       const responseHandler: ResponseDetails = {
//         statusCode: 0,
//         message: "",
//       };
  
//       if (
//         (!updatePayload.productName || updatePayload.productName === "") &&
//         (!updatePayload.productCategory ||
//           updatePayload.productCategory === "") &&
//         updatePayload.cost === null &&
//         updatePayload.availableQuantity === null
//       ) {
//         throw errorUtilities.createError(
//           "At least one field must be selected for update",
//           400
//         );
//       }
  
//       const { userId, productId } = updatePayload;
  
//       const product = await productDatabase.getOne({ _id: productId });
  
//       if (!product) {
//         throw errorUtilities.createError("Product not found", 404);
//       }
  
//       const shop = await shopDatabase.getOne({ _id: product.shopId });
  
//       if (!shop) {
//         throw errorUtilities.createError("Shop not found. Please try again", 404);
//       }
  
//       if (shop.ownerId != userId) {
//         throw errorUtilities.createError(
//           "You can only update products in your shop(s)",
//           400
//         );
//       }
  
//       if (shop.isBlacklisted) {
//         throw errorUtilities.createError(
//           "This shop has been deactivated. Please contact support on info@naijamade.com",
//           400
//         );
//       }
  
//       if (product.isBlacklisted) {
//         throw errorUtilities.createError(
//           "This product has been blocked. Please contact support on info@naijamade.com",
//           400
//         );
//       }
  
//       let updateDetails: Record<string, any> = {};
  
//       if (updatePayload.productName) {
//         updateDetails.productName = updatePayload.productName;
//       }
  
//       if (updatePayload.productCategory) {
//         updateDetails.productCategory = updatePayload.productCategory;
//       }
  
//       if (updatePayload.cost) {
//         updateDetails.cost = updatePayload.cost;
//       }
  
//       if (updatePayload.availableQuantity) {
//         updateDetails.availableQuantity = updatePayload.availableQuantity;
//       }
  
//       const newProduct: any = await productDatabase.updateOne(
//         {
//           _id: productId,
//         },
//         {
//           $set: updateDetails,
//         }
//       );
  
//       const extractedShop = await productDatabase.extractProductDetails(
//         newProduct
//       );
  
//       responseHandler.statusCode = 200;
//       responseHandler.message = "Product updated successfully";
//       responseHandler.data = {
//         product: extractedShop,
//       };
//       return responseHandler;
//     }
//   );
  
//   const getVendorSingleProduct = errorUtilities.withErrorHandling(
//     async (queryDetails: Record<string, any>): Promise<any> => {
//       const responseHandler: ResponseDetails = {
//         statusCode: 0,
//         message: "",
//       };
  
//       const { productId } = queryDetails;
  
//       const product = await productDatabase.getOne(
//         { _id: productId },
//         {
//           productName: 1,
//           productCategory: 1,
//           shopId: 1,
//           cost: 1,
//           availableQuantity: 1,
//           isAvailable: 1,
//           productImage: 1,
//           numberOfSales: 1,
//           ratings: 1,
//           isBlacklisted: 1,
//         }
//       );
  
//       if (!product) {
//         throw errorUtilities.createError(
//           "Product not found. Please try again or contact admin",
//           404
//         );
//       }
  
//       responseHandler.statusCode = 200;
//       responseHandler.message = "Product fetched successfully";
//       responseHandler.data = {
//         product,
//       };
//       return responseHandler;
//     }
//   );
  
//   const getAllVendorProductsForAShop = errorUtilities.withErrorHandling(
//     async (queryDetails: Record<string, any>): Promise<any> => {
//       const responseHandler: ResponseDetails = {
//         statusCode: 0,
//         message: "",
//       };
  
//       const query = await queryFilter(queryDetails.query || {});
  
//       const size = Number(queryDetails.query.size) || 10;
  
//       const skip = (Number(queryDetails.query.page) - 1) * size || 0;
  
//       const { shopId } = queryDetails;
  
//       const filter = {
//         ...query,
//         shopId,
//       };
  
//       const options = {
//         skip,
//         limit: size,
//       };
  
//       const projection = {
//         productName: 1,
//         productCategory: 1,
//         shopId: 1,
//         cost: 1,
//         availableQuantity: 1,
//         isAvailable: 1,
//         productImage: 1,
//         numberOfSales: 1,
//         ratings: 1,
//         isBlacklisted: 1,
//       };
  
//       const products = await productDatabase.getMany(filter, projection, options);
  
//       if (!products || products.length === 0) {
//         throw errorUtilities.createError(
//           "No Products found. Please try again or contact admin",
//           404
//         );
//       }
  
//       responseHandler.statusCode = 200;
//       responseHandler.message = "products fetched successfully";
//       responseHandler.data = {
//         products,
//       };
//       return responseHandler;
//     }
//   );
  
//   const deleteSingleVendorProduct = errorUtilities.withErrorHandling(
//     async (deleteDetails: Record<string, any>): Promise<any> => {
//       const responseHandler: ResponseDetails = {
//         statusCode: 0,
//         message: "",
//       };
  
//       const { shopId, userId, productId } = deleteDetails;
  
//       const shop = await shopDatabase.getOne({ _id: shopId });
  
//       if (!shop) {
//         throw errorUtilities.createError("Shop not found", 404);
//       }
//       if (shop.ownerId != userId) {
//         throw errorUtilities.createError(
//           "You are not the owner of this shop. You cannot delete the product",
//           403
//         );
//       }
  
//       const product = await productDatabase.getOne({ _id: productId });
  
//       if (!product) {
//         throw errorUtilities.createError("Product not found", 404);
//       }
  
//       const operations = [
//         async (session: ClientSession) => {
//           await productDatabase.deleteOne({ _id: productId });
//         },
//         async (session: ClientSession) => {
//           await shopDatabase.updateOne(
//             { _id: shopId },
//             { $inc: { noOfProducts: -1 } }
//           );
//         },
//       ];
  
//       await performTransaction(operations);
  
//       responseHandler.statusCode = 200;
//       responseHandler.message = "Product deleted successfully";
//       return responseHandler;
//     }
//   );
  
//   const deleteManyVendorProductsForAShop = errorUtilities.withErrorHandling(
//     async (deleteDetails: Record<string, any>): Promise<any> => {
//       const responseHandler: ResponseDetails = {
//         statusCode: 0,
//         message: "",
//       };
  
//       const { userId, shopId, productIds } = deleteDetails;
  
//       if (!productIds || productIds.length === 0) {
//         throw errorUtilities.createError(
//           "No Products selected for deletion. Please select Products.",
//           404
//         );
//       }
  
//       const shop = await shopDatabase.getOne(
//         { _id: shopId, ownerId: userId },
//         { _id: 1 }
//       );
  
//       if (!shop) {
//         throw errorUtilities.createError("Shop not found.", 404);
//       }
  
//       const operations = [
//         async (session: ClientSession) => {
//       await productDatabase.deleteMany({ _id: { $in: productIds } })
//         },
//         async (session: ClientSession) => {
//       await shopDatabase.updateOne({_id:shopId},{ $inc: { noOfProducts: -1 } })
//         }
//       ]
  
//       await performTransaction(operations);
  
//       responseHandler.statusCode = 200;
//       responseHandler.message = "Products deleted successfully";
//       return responseHandler;
//     }
//   );
//   const updateProductImage = errorUtilities.withErrorHandling(
//     async (request: Request): Promise<any> => {
//       const responseHandler: ResponseDetails = {
//         statusCode: 0,
//         message: "",
//       };
  
//       const productImage = request?.file?.path;
  
//       if (!productImage) {
//         throw errorUtilities.createError("Select an image please", 400);
//       }
  
//       const { productId } = request.params;
  
//       const productCheck = await productDatabase.getOne(
//         { _id: productId },
//         { _id: 1 }
//       );
  
//       if (!productCheck) {
//         throw errorUtilities.createError("Product not found", 404);
//       }
  
//       const newProduct: any = await productDatabase.updateOne(
//         {
//           _id: productId,
//         },
//         {
//           $set: { productImage },
//         }
//       );
  
//       const extractedProduct = await productDatabase.extractProductDetails(
//         newProduct
//       );
  
//       responseHandler.statusCode = 200;
//       responseHandler.message = "Shop image changed successfully";
//       responseHandler.data = {
//         product: extractedProduct,
//       };
//       return responseHandler;
//     }
//   );





  export default {
    userCreateMovieService,
    // updateProductService,
    // getVendorSingleProduct,
    // getAllVendorProductsForAShop,
    // deleteSingleVendorProduct,
    // deleteManyVendorProductsForAShop,
    // updateProductImage,
  };