import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { addEvent, listEvents, singleEvent } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addEvent
);
eventRouter.get("/list", listEvents);
eventRouter.get("/:id", singleEvent);

export default eventRouter;
