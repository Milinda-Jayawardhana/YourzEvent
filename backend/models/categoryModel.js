import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { _id: true }
);

const categorySchema = new mongoose.Schema(
  {
    majorCategory: {
      type: String,
      enum: ["Flower Bouquets", "Gift Items"],
      default: "Flower Bouquets",
      required: true,
      trim: true,
    },
    name: { type: String, required: true, trim: true },
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

categorySchema.index({ majorCategory: 1, name: 1 }, { unique: true });

const categoryModel =
  mongoose.models.category || mongoose.model("Category", categorySchema);

export default categoryModel;
