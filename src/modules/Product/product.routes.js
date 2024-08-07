import express from "express";
import * as productController from "./product.controller.js.js";
import {
  createProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from "./Product.validator.js";
import { validation } from "../../middleware/validation.js";
import { uploadMixFile } from "../../middleware/fileUploads.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getAllProducts)
  // .post(validation(createProductSchema), productController.createProduct);
  .post(
    uploadMixFile('product', [
      { name: "imgCover", maxCount: 1 },
      { name: "images", maxCount: 8 },
    ]),
    productController.createProduct
  );

productRouter
  .route("/:id")
  .get(productController.getProductById)
  .put(validation(updateProductSchema), productController.updateProduct)
  .delete(validation(deleteProductSchema), productController.deleteProduct);

export default productRouter;
