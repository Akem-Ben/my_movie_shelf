import { Request, Response, NextFunction } from "express";
import { moviesServices, userAuthService } from "../../services";
import { responseUtilities } from "../../utilities";
import { JwtPayload } from "jsonwebtoken";


const createMovie = async (
    request: JwtPayload,
    response: Response
  ): Promise<any> => {
  
    const movie: any = await moviesServices.userCreateMovieService(request.body, request);
  
    return responseUtilities.responseHandler(
      response,
      movie.message,
      movie.statusCode,
      movie.details,
      movie.data
    );
  };
  
//   const updateProduct = async (
//     request: JwtPayload,
//     response: Response
//   ): Promise<any> => {
//     const userId = request.user.id;
  
//     const { productId } = request.params
  
//     const updatedProduct = await vendorProductServices.updateProductService({
//       ...request.body,
//       userId,
//       productId
//     });
  
//     return responseUtilities.responseHandler(
//       response,
//       updatedProduct.message,
//       updatedProduct.statusCode,
//       updatedProduct.details,
//       updatedProduct.data
//     );
//   };
  
//   const vendorSingleProduct = async (
//     request: JwtPayload,
//     response: Response
//   ): Promise<any> => {
//     const { productId } = request.params;
  
//     const product = await vendorProductServices.getVendorSingleProduct({
//       productId,
//     });
  
//     return responseUtilities.responseHandler(
//       response,
//       product.message,
//       product.statusCode,
//       product.details,
//       product.data
//     );
//   };
  
//   const allVendorProductsForAShop = async (
//     request: JwtPayload,
//     response: Response
//   ): Promise<any> => {
//     const user_id = request.user.id;
  
//     const { shopId } = request.params;
  
//     const { query } = request
  
//     const products = await vendorProductServices.getAllVendorProductsForAShop(
//       {shopId, query}
//     );
  
//     return responseUtilities.responseHandler(
//       response,
//       products.message,
//       products.statusCode,
//       products.details,
//       products.data
//     );
//   };
  
//   const deleteVendorSingleProduct = async (
//     request: JwtPayload,
//     response: Response
//   ): Promise<any> => {
//     const userId = request.user.id;
  
//     const { shopId } = request.params
  
//     const result = await vendorProductServices.deleteSingleVendorProduct({
//       ...request.body,
//       userId,
//       shopId
//     });
  
//     return responseUtilities.responseHandler(
//       response,
//       result.message,
//       result.statusCode,
//       result.details,
//       result.data
//     );
//   };
  
//   const deleteManyVendorShopProducts = async (
//     request: JwtPayload,
//     response: Response
//   ): Promise<any> => {
//     const userId = request.user.id;
  
//     const { shopId } = request.params
  
//     const result = await vendorProductServices.deleteManyVendorProductsForAShop({
//       ...request.body,
//       userId,
//       shopId
//     });
  
//     return responseUtilities.responseHandler(
//       response,
//       result.message,
//       result.statusCode,
//       result.details,
//       result.data
//     );
//   };


//   const updateVendorProductImage = async (
//     request: JwtPayload,
//     response: Response
//   ): Promise<any> => {
  
//     const updatedProductImage = await vendorProductServices.updateProductImage(
//       request
//     );
  
//     return responseUtilities.responseHandler(
//       response,
//       updatedProductImage.message,
//       updatedProductImage.statusCode,
//       updatedProductImage.data
//     );
//   };
  
  export default {
    createMovie,
    // updateProduct,
    // vendorSingleProduct,
    // allVendorProductsForAShop,
    // deleteVendorSingleProduct,
    // deleteManyVendorShopProducts,
    // changeVendorProductStatus,
    // updateVendorProductImage,
  };