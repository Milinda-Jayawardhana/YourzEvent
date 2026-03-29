import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  addCategory,
  addSubcategory,
  deleteCategory,
  deleteSubcategory,
  listCategories,
  updateCategory,
  updateSubcategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/list", listCategories);
categoryRouter.post("/add", adminAuth, addCategory);
categoryRouter.put("/:id", adminAuth, updateCategory);
categoryRouter.delete("/:id", adminAuth, deleteCategory);
categoryRouter.post("/:id/subcategories", adminAuth, addSubcategory);
categoryRouter.put("/:id/subcategories/:subcategoryId", adminAuth, updateSubcategory);
categoryRouter.delete("/:id/subcategories/:subcategoryId", adminAuth, deleteSubcategory);

export default categoryRouter;
