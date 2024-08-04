import express from "express";
import * as categoryController from "./categories.controller.js";
import subCategoryRouter from "../subcategories/subcategory.routes.js";
import { validation } from "../../middleware/validation.js";
import {
  createCategoryByIdSchema,
  createCategorySchema,
} from "./categories.validator.js";
const categoryRouter = express.Router();
import multer from "multer";
import AppError from "../../utils/AppError.js";

// categoryRouter.get("/", categoryController.getAllCategories )
// categoryRouter.post("/", categoryController.createCategory )

categoryRouter.use("/:id/subCategory", subCategoryRouter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the directory where uploaded files will be saved
    cb(null, "uploads/category");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename to prevent conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  console.log(file)
  // Validate uploaded file type (MIME type)
  if (file.mimetype.startsWith("image")) {
    // Allow only image files
    cb(null, true);
  } else {
     // Reject non-image files with a custom error
    cb(new AppError('invalid image', 400), false)
  }
}

const upload = multer({ storage, fileFilter });

categoryRouter
  .route("/")
  .get(categoryController.getAllCategories)
  .post(upload.single('image'), validation(createCategorySchema), categoryController.createCategory);

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
