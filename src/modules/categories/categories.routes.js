import express from "express";
import * as categoryController from "./categories.controller.js"
const categoryRouter = express.Router()

// categoryRouter.get("/", categoryController.getAllCategories )
// categoryRouter.post("/", categoryController.createCategory ) 
categoryRouter.route("/")
.get(categoryController.getAllCategories )
.post(categoryController.createCategory )




// categoryRouter.get("/:id", categoryController.getCategoryById )
// categoryRouter.put("/:id", categoryController.updateCategory )
// categoryRouter.delete("/:id", categoryController.deleteCategory )
categoryRouter.route("/:id")
.get(categoryController.getCategoryById )
.put(categoryController.updateCategory )
.delete(categoryController.deleteCategory )










export default categoryRouter;