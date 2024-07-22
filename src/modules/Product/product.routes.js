import express from "express";
import * as productController from "./product.controller.js.js";
import subCategoryRouter from "../subcategories/subcategory.routes.js";

const productRouter = express.Router();

productRouter.use('/:id/subCategory', subCategoryRouter);

productRouter.route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

productRouter.route("/:id")
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

export default productRouter;

