import express from "express";
import {
  getAllSubCategories,
  createSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} from "./subcategory.controller.js";

const subCategoryRouter = express.Router();

subCategoryRouter.route("/").get(getAllSubCategories).post(createSubCategory);

subCategoryRouter
  .route("/:id")
  .get(getSubCategoryById)
  .patch(updateSubCategory)
  .delete(deleteSubCategory);

export default subCategoryRouter;
