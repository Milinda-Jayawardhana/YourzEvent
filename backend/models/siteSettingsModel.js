import mongoose from "mongoose";

const heroImageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
  },
  { _id: true }
);

const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    heroImages: { type: [heroImageSchema], default: [] },
    showTextSlide: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const siteSettingsModel =
  mongoose.models.siteSettings ||
  mongoose.model("siteSettings", siteSettingsSchema);

export default siteSettingsModel;
