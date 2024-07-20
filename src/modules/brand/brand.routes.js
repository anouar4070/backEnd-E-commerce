import express from "express";
import {
  getAllBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "./brand.controller.js";

const brandRouter = express.Router();

brandRouter.route("/").get(getAllBrands).post(createBrand);

brandRouter.route("/:id").get(getBrandById).patch(updateBrand).delete(deleteBrand);

export default brandRouter;
