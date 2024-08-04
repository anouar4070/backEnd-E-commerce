import express from "express";
import * as categoryController from "./categories.controller.js";
import subCategoryRouter from "../subcategories/subcategory.routes.js";
import { validation } from "../../middleware/validation.js";
import {
  createCategoryByIdSchema,
  createCategorySchema,
} from "./categories.validator.js";
import { uploadSingleFile } from "../../middleware/fileUploads.js";
const categoryRouter = express.Router();



// categoryRouter.get("/", categoryController.getAllCategories )
// categoryRouter.post("/", categoryController.createCategory )

categoryRouter.use("/:id/subCategory", subCategoryRouter);


categoryRouter
  .route("/")
  .get(categoryController.getAllCategories)
  .post(uploadSingleFile('category', 'image'), validation(createCategorySchema), categoryController.createCategory);

// categoryRouter.get("/:id", categoryController.getCategoryById )
// categoryRouter.put("/:id", categoryController.updateCategory )
// categoryRouter.delete("/:id", categoryController.deleteCategory )
categoryRouter
  .route("/:id")
  .get(validation(createCategoryByIdSchema), categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default categoryRouter;

//   http://localhost:3000/api/v1/category/  **category routes**
//   http://localhost:3000/api/v1/category/669546872c30216cf3ccad42/subCategory
//  http://localhost:3000/api/v1/subCategory
