import express from "express";
import * as brandController from "./brands.controller.js";
import { createBrandSchema, deleteBrandSchema, updateBrandSchema } from "./brands.validator.js";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../middleware/fileUploads.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .get(brandController.getAllBrands)
  .post(uploadSingleFile('brand', 'logo'), validation(createBrandSchema), brandController.createBrand);

brandRouter
  .route("/:id")
  .get(brandController.getBrandById)
  .put(uploadSingleFile('brand', 'logo'), validation(updateBrandSchema), brandController.updateBrand)
  .delete(validation(deleteBrandSchema), brandController.deleteBrand);

export default brandRouter;
