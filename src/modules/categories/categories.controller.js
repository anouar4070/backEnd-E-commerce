import { CategoryModel } from "../../../models/category.model.js";

const createCategory = async (req, res, next) => {
  let { name } = req.body;
  // await CategoryModel.insertMany({name, slug: name})
  // await CategoryModel.create({name, slug: name})
  let results = new CategoryModel({ name, slug: name });
  await results.save();
  res.status(201).json({ message: "added" });
};

const getAllCategories = async (req, res, next) => {
  let results = await CategoryModel.find({});
  res.json({ message: "Done", results });
};

const getCategoryById = async (req, res, next) => {
  let { id } = req.params;
  let results = await CategoryModel.findById(id);
  res.json({ message: "Done", results });
};

const updateCategory = async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  let results = await CategoryModel.findByIdAndUpdate(
    id,
    { name, slug: name },
    { new: true }
  );
  res.json({ message: "Done", results });
};

const deleteCategory = async (req, res, next) => {
  let { id } = req.params;
  let results = await CategoryModel.findByIdAndDelete(id);
  res.json({ message: "Done", results });
};

export {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
