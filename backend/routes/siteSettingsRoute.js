import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  getHeroSettings,
  addHeroImages,
  deleteHeroImage,
  updateTextSlideVisibility,
} from "../controllers/siteSettingsController.js";

const siteSettingsRouter = express.Router();

siteSettingsRouter.get("/hero", getHeroSettings);
siteSettingsRouter.post("/hero/images", adminAuth, upload.array("images", 10), addHeroImages);
siteSettingsRouter.delete("/hero/images/:imageId", adminAuth, deleteHeroImage);
siteSettingsRouter.put("/hero/text-slide", adminAuth, updateTextSlideVisibility);

export default siteSettingsRouter;
