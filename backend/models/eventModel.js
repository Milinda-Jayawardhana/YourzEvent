import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    images: {
      type: [String],
      validate: {
        validator: (value) => Array.isArray(value) && value.length === 4,
        message: "An event must contain exactly 4 images",
      },
      required: true,
    },
    date: { type: Number, required: true },
  },
  { timestamps: true }
);

const eventModel = mongoose.models.event || mongoose.model("Event", eventSchema);

export default eventModel;
