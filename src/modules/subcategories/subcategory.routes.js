import express from "express";
import * as subCategoryController from "./subcategory.controller.js";
import { validation } from "../../middleware/validation.js";
import { createSubCategorySchema, createSubCategoryByIdSchema } from "./subcategory.validator.js";

const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
  .route("/")
  .get(subCategoryController.getAllSubCategories)
  .post(
    validation(createSubCategorySchema),
    subCategoryController.createSubCategory
  );

subCategoryRouter
  .route("/:id")
  .get(validation(createSubCategoryByIdSchema), subCategoryController.getSubCategoryById)
  .put(subCategoryController.updateSubCategory)
  .delete(subCategoryController.deleteSubCategory);

export default subCategoryRouter;
