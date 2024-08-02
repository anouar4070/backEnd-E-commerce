

import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { BrandModel } from "../../../models/brands.model.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import ApiFeatures from "../../utils/APIFeatures.js";



const createBrand = catchAsyncError(async (req, res, next) => {
  let { name } = req.body;
  let results = new BrandModel({ name, slug: slugify(name) });
  let added = await results.save();
  res.status(201).json({ message: "Brand added", added });
});

const getAllBrands = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(BrandModel.find(), req.query)
  .pagination().sort().fields()

  let results = await apiFeature.mongooseQuery;
res.json({ message: "The all brands are:", page:apiFeature.page, results });


  // let results = await BrandModel.find({});
  // res.json({ message: "Done", results });
});

const getBrandById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await BrandModel.findById(id);
  if (results) return res.json({ message: "Done", results });
  res.json({ message: "brand doesn't exist" });
});

const updateBrand = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  let results = await BrandModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  // res.json({ message: "Done", results });
  
  !results && next(new AppError("brand not found", 404))
  results && res.json({ message: "Done", results });

});

const deleteBrand = deleteOne(BrandModel)

export {
  getAllBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand, 
};
