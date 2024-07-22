
import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { ProductModel } from "../../../models/product.model.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";

const createProduct = catchAsyncError(async (req, res, next) => {
  let { name, price, description } = req.body;

  let results = new ProductModel({ name, slug: slugify(name), price, description });
  let added = await results.save();
  res.status(201).json({ message: "added", added });
});

const getAllProducts = catchAsyncError(async (req, res, next) => {
  let results = await ProductModel.find({});
  res.json({ message: "Done", results });
});

const getProductById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await ProductModel.findById(id);
  if (results) return res.json({ message: "Done", results });
  res.json({ message: "product doesn't exist" });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { name, price, description } = req.body;
  let results = await ProductModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), price, description },
    { new: true }
  );

  !results && next(new AppError("product not found", 404));
  results && res.json({ message: "Done", results });
});

const deleteProduct = deleteOne(ProductModel);

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
