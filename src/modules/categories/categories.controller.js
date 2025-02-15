import { CategoryModel } from "../../../models/category.model.js";
import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import ApiFeatures from "../../utils/APIFeatures.js";

const createCategory = catchAsyncError(async (req, res, next) => {
  // console.log(req.file, "hello from file location");

  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  // let { name } = req.body;
  // await CategoryModel.insertMany({name, slug: name})
  // await CategoryModel.create({name, slug: name})
  // let results = new CategoryModel({ name, slug: slugify(name) });
  let results = new CategoryModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "added", added });
});

const getAllCategories = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(CategoryModel.find(), req.query)
    .pagination()
    .sort()
    .fields();

  let results = await apiFeature.mongooseQuery;
  res.json({
    message: "The all categories are:",
    page: apiFeature.page,
    results,
  });

  // let results = await CategoryModel.find({});
  // res.json({ message: "Done", results });
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

  !results && next(new AppError("category not found", 404));
  results && res.json({ message: "Done", results });
});

const deleteCategory = deleteOne(CategoryModel);

export {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
