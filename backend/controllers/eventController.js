import { v2 as cloudinary } from "cloudinary";
import eventModel from "../models/eventModel.js";

const addEvent = async (req, res) => {
  try {
    const { title, description } = req.body;
    const normalizedTitle = title?.trim();
    const normalizedDescription = description?.trim();

    if (!normalizedTitle || !normalizedDescription) {
      return res.json({ success: false, message: "Title and description are required" });
    }

    const imageFields = ["image1", "image2", "image3", "image4"];
    const images = imageFields
      .map((field) => req.files?.[field]?.[0])
      .filter((item) => item !== undefined);

    if (images.length !== 4) {
      return res.json({ success: false, message: "Please upload all 4 event images" });
    }

    const imageUrls = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    await eventModel.create({
      title: normalizedTitle,
      description: normalizedDescription,
      images: imageUrls,
      date: Date.now(),
    });

    res.json({ success: true, message: "Event added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listEvents = async (req, res) => {
  try {
    const events = await eventModel.find({}).sort({ date: -1 });
    res.json({ success: true, events });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleEvent = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id);

    if (!event) {
      return res.json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, event });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addEvent, listEvents, singleEvent };
