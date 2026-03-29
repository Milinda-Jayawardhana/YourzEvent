import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { _id: true }
);

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    subcategories: {
      type: [subCategorySchema],
      default: [],
      validate: {
        validator: (value) => {
          const normalized = value.map((item) => item.name.trim().toLowerCase());
          return new Set(normalized).size === normalized.length;
        },
        message: "Subcategory names must be unique within a category",
      },
    },
  },
  { timestamps: true }
);

const categoryModel =
  mongoose.models.category || mongoose.model("Category", categorySchema);

export default categoryModel;
