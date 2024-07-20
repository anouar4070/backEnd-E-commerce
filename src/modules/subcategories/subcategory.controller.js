import { subCategoryModel } from "../../../models/subCategory.model.js";
import slugify from "slugify";
import AppError from "../../utils/AppError.js";

const catchAsyncError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => {
      next(err);
    });
  };
};

const createSubCategory = catchAsyncError(async (req, res, next) => {
  let { name, category } = req.body;
  let results = new subCategoryModel({ name, slug: slugify(name), category });
  let added = await results.save();
  res.status(201).json({ message: "Subcategory added", added });
});

const getAllSubCategories = catchAsyncError(async (req, res, next) => {
  let results = await subCategoryModel.find({}).populate('category');
  res.json({ message: "Done", results });
});

const getSubCategoryById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await subCategoryModel.findById(id).populate('category');
  if (results) return res.json({ message: "Done", results });
  res.json({ message: "Subcategory doesn't exist" });
});

const updateSubCategory = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { name, category } = req.body;
  let results = await subCategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category },
    { new: true }
  );

  !results && next(new AppError("Subcategory not found", 404));
  results && res.json({ message: "Done", results });
});

const deleteSubCategory = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await subCategoryModel.findByIdAndDelete(id);
  !results && res.status(404).json({ message: "Subcategory not found" });

  results && res.json({ message: "Deleted" });
});

export {
  getAllSubCategories,
  createSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
