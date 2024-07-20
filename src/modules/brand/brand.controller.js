import { BrandModel } from "../../../models/brands.model.js";
import slugify from "slugify";
import AppError from "../../utils/AppError.js";

const catchAsyncError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => {
      next(err);
    });
  };
};

const createBrand = catchAsyncError(async (req, res, next) => {
  let { name } = req.body;
  let results = new BrandModel({ name, slug: slugify(name) });
  let added = await results.save();
  res.status(201).json({ message: "Brand added", added });
});

const getAllBrands = catchAsyncError(async (req, res, next) => {
  let results = await BrandModel.find({});
  res.json({ message: "Done", results });
});

const getBrandById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await BrandModel.findById(id);
  if (results) return res.json({ message: "Done", results });
  res.json({ message: "Brand doesn't exist" });
});

const updateBrand = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  let results = await BrandModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );

  !results && next(new AppError("Brand not found", 404));
  results && res.json({ message: "Done", results });
});

const deleteBrand = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await BrandModel.findByIdAndDelete(id);
  !results && res.status(404).json({ message: "Brand not found" });

  results && res.json({ message: "Deleted" });
});

export {
  getAllBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
};
