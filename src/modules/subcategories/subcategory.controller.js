import { subCategoryModel } from "../../../models/subCategory.model.js";
import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";



const createSubCategory = catchAsyncError(async (req, res, next) => {
  let { name, categoryId } = req.body;
  let results = new subCategoryModel({
    name,
    slug: slugify(name),
    category: categoryId,
  });
  let added = await results.save();
  res.status(201).json({ message: "Subcategory added", added });
});

const getAllSubCategories = catchAsyncError(async (req, res, next) => {
  console.log("hello from get All subCategory", req.params);
  let filters = {};
  if (req.params && req.params.id) {
    filters = {
      category: req.params.id,
    };
  }

  let results = await subCategoryModel.find(filters).populate("category");

  res.json({ message: "Done", results });
});

const getSubCategoryById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await subCategoryModel.findById(id).populate("category");
  if (results) return res.json({ message: "Done", results });
  res.json({ message: "Subcategory doesn't exist" });
});

const updateSubCategory = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { name, categoryId } = req.body;
  let results = await subCategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category: categoryId },
    { new: true }
  );

  !results && next(new AppError("Subcategory not found", 404));
  results && res.json({ message: "Done", results });
});

const deleteSubCategory = deleteOne(subCategoryModel)

export {
  getAllSubCategories,
  createSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
