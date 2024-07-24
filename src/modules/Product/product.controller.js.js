import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { ProductModel } from "../../../models/product.model.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";

const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  let results = new ProductModel(req.body);
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
  let { title } = req.body;
  if (req.body.title) {
    req.body.slug = slugify(title);
  }

  let results = await ProductModel.findByIdAndUpdate(
    id,
    { ...req.body },
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
