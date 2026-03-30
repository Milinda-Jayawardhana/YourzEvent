import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

const normalizeName = (value = "") => value.trim().replace(/\s+/g, " ");
const normalizeMajorCategory = (value = "") => normalizeName(value);
const MAJOR_CATEGORIES = ["Flower Bouquets", "Gift Items"];
const buildNameRegex = (name) => ({
  $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
  $options: "i",
});

const listCategories = async (req, res) => {
  try {
    const majorCategory = normalizeMajorCategory(req.query.majorCategory);
    const filter = majorCategory ? { majorCategory } : {};
    const categories = await categoryModel.find(filter).sort({ majorCategory: 1, name: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const name = normalizeName(req.body.name);
    const majorCategory = normalizeMajorCategory(req.body.majorCategory);

    if (!name) {
      return res.json({ success: false, message: "Category name is required" });
    }

    if (!MAJOR_CATEGORIES.includes(majorCategory)) {
      return res.json({
        success: false,
        message: "Major category must be Flower Bouquets or Gift Items",
      });
    }

    const existing = await categoryModel.findOne({
      majorCategory,
      name: buildNameRegex(name),
    });

    if (existing) {
      return res.json({ success: false, message: "Category already exists" });
    }

    await categoryModel.create({ majorCategory, name, subcategories: [] });
    res.json({ success: true, message: "Category added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const name = normalizeName(req.body.name);
    const majorCategory = normalizeMajorCategory(req.body.majorCategory);
    const { id } = req.params;

    if (!name) {
      return res.json({ success: false, message: "Category name is required" });
    }

    if (!MAJOR_CATEGORIES.includes(majorCategory)) {
      return res.json({
        success: false,
        message: "Major category must be Flower Bouquets or Gift Items",
      });
    }

    const category = await categoryModel.findById(id);
    if (!category) {
      return res.json({ success: false, message: "Category not found" });
    }

    const existing = await categoryModel.findOne({
      _id: { $ne: id },
      majorCategory,
      name: buildNameRegex(name),
    });

    if (existing) {
      return res.json({ success: false, message: "Category already exists" });
    }

    const previousName = category.name;
    const previousMajorCategory = category.majorCategory;
    category.majorCategory = majorCategory;
    category.name = name;
    await category.save();

    await productModel.updateMany(
      { majorCategory: previousMajorCategory, category: previousName },
      { $set: { majorCategory, category: name } }
    );

    res.json({ success: true, message: "Category updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.json({ success: false, message: "Category not found" });
    }

    const linkedProducts = await productModel.countDocuments({
      majorCategory: category.majorCategory,
      category: category.name,
    });
    if (linkedProducts > 0) {
      return res.json({
        success: false,
        message: "Remove or update products in this category before deleting it",
      });
    }

    await categoryModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const name = normalizeName(req.body.name);

    if (!name) {
      return res.json({ success: false, message: "Subcategory name is required" });
    }

    const category = await categoryModel.findById(id);
    if (!category) {
      return res.json({ success: false, message: "Category not found" });
    }

    const exists = category.subcategories.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      return res.json({ success: false, message: "Subcategory already exists" });
    }

    category.subcategories.push({ name });
    await category.save();

    res.json({ success: true, message: "Subcategory added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateSubcategory = async (req, res) => {
  try {
    const { id, subcategoryId } = req.params;
    const name = normalizeName(req.body.name);

    if (!name) {
      return res.json({ success: false, message: "Subcategory name is required" });
    }

    const category = await categoryModel.findById(id);
    if (!category) {
      return res.json({ success: false, message: "Category not found" });
    }

    const subcategory = category.subcategories.id(subcategoryId);
    if (!subcategory) {
      return res.json({ success: false, message: "Subcategory not found" });
    }

    const exists = category.subcategories.some(
      (item) =>
        item._id.toString() !== subcategoryId && item.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      return res.json({ success: false, message: "Subcategory already exists" });
    }

    const previousName = subcategory.name;
    subcategory.name = name;
    await category.save();

    await productModel.updateMany(
      {
        majorCategory: category.majorCategory,
        category: category.name,
        subCategory: previousName,
      },
      { $set: { subCategory: name } }
    );

    res.json({ success: true, message: "Subcategory updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteSubcategory = async (req, res) => {
  try {
    const { id, subcategoryId } = req.params;
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.json({ success: false, message: "Category not found" });
    }

    const subcategory = category.subcategories.id(subcategoryId);
    if (!subcategory) {
      return res.json({ success: false, message: "Subcategory not found" });
    }

    const linkedProducts = await productModel.countDocuments({
      majorCategory: category.majorCategory,
      category: category.name,
      subCategory: subcategory.name,
    });

    if (linkedProducts > 0) {
      return res.json({
        success: false,
        message: "Remove or update products in this subcategory before deleting it",
      });
    }

    subcategory.deleteOne();
    await category.save();

    res.json({ success: true, message: "Subcategory deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addCategory,
  addSubcategory,
  deleteCategory,
  deleteSubcategory,
  listCategories,
  updateCategory,
  updateSubcategory,
};
