import { v2 as cloudinary } from "cloudinary";
import siteSettingsModel from "../models/siteSettingsModel.js";

const SETTINGS_KEY = "main";

const getOrCreateSettings = async () => {
  let settings = await siteSettingsModel.findOne({ key: SETTINGS_KEY });

  if (!settings) {
    settings = await siteSettingsModel.create({ key: SETTINGS_KEY });
  }

  return settings;
};

const getHeroSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({
      success: true,
      heroImages: settings.heroImages,
      showTextSlide: settings.showTextSlide,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addHeroImages = async (req, res) => {
  try {
    const images = req.files || [];

    if (!images.length) {
      return res.json({ success: false, message: "Please upload at least one image" });
    }

    const uploadedImages = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
        return { image: result.secure_url };
      })
    );

    const settings = await getOrCreateSettings();
    settings.heroImages.push(...uploadedImages);
    await settings.save();

    res.json({
      success: true,
      message: "Hero images updated successfully",
      heroImages: settings.heroImages,
      showTextSlide: settings.showTextSlide,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteHeroImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const settings = await getOrCreateSettings();

    const imageExists = settings.heroImages.some((item) => item._id.toString() === imageId);

    if (!imageExists) {
      return res.json({ success: false, message: "Image not found" });
    }

    settings.heroImages = settings.heroImages.filter((item) => item._id.toString() !== imageId);
    await settings.save();

    res.json({
      success: true,
      message: "Hero image deleted successfully",
      heroImages: settings.heroImages,
      showTextSlide: settings.showTextSlide,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateTextSlideVisibility = async (req, res) => {
  try {
    const { showTextSlide } = req.body;
    const settings = await getOrCreateSettings();

    settings.showTextSlide = showTextSlide === true || showTextSlide === "true";
    await settings.save();

    res.json({
      success: true,
      message: "Text slide visibility updated successfully",
      heroImages: settings.heroImages,
      showTextSlide: settings.showTextSlide,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getHeroSettings, addHeroImages, deleteHeroImage, updateTextSlideVisibility };
