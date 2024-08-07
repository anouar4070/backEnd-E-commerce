import slugify from "slugify";
import AppError from "../../utils/AppError.js";
import { ProductModel } from "../../../models/product.model.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import ApiFeatures from "../../utils/APIFeatures.js";


const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((elm) => {
    elm.filename
    }
  );
  console.log(req.files);

  let results = new ProductModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "added", added });
});

// skip... limit

const getAllProducts = catchAsyncError(async (req, res, next) => {
 
let apiFeature = new ApiFeatures(ProductModel.find(), req.query)
.pagination().sort().fields()
 
  let results = await apiFeature.mongooseQuery;

  res.json({ message: "The all products are:", page:apiFeature.page, results });
});

const getProductById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await productModel.findById(id);
  !results && next(new AppError("Product not found", 404));
  results &&
    res.json({ message: "The Product that you look for is:", results });
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

/**
 * notes: l'operateur de comparaison(query)
 * eq => equal
 * ne => not equal
 * gt => greater than
 * gte => greater than or equal
 * lt => less than
 * lte => less than or equal
 * in => include
 * nin => not include
 * example:
 * const courses = await course.find({price:{$gte:100, $lte:200 } } )
 * const courses = await course.find({price:{$in: [10, 20, 50] } } )
 *
 * notes: l'operateur logique(query)
 * .and([{student:"amin"}])
 * .or
 * .select([ispublished: 1])
 * only on sql: .like
 * in nosql regex
 */


