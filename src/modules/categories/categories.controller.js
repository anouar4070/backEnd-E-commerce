import { CategoryModel } from "../../../models/category.model.js";
import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";



const createCategory = catchAsyncError(async (req, res, next) => {
  let { name } = req.body;
  // await CategoryModel.insertMany({name, slug: name})
  // await CategoryModel.create({name, slug: name})
  let results = new CategoryModel({ name, slug: slugify(name) });
  let added = await results.save();
  res.status(201).json({ message: "added", added });
});

const getAllCategories = catchAsyncError(async (req, res, next) => {
  let results = await CategoryModel.find({});
  res.json({ message: "Done", results });
});

const getCategoryById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await CategoryModel.findById(id);
  if (results) return res.json({ message: "Done", results });
  res.json({ message: "category doesn't exist" });
});

const updateCategory = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  let results = await CategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  // res.json({ message: "Done", results });
  
  !results && next(new AppError("category not found", 404))
  results && res.json({ message: "Done", results });

});

const deleteCategory = deleteOne(CategoryModel)

export {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
