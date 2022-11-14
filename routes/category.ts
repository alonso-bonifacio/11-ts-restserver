import { Router } from "express";
import {
  deleteCategory,
  getCategory,
  getCategorys,
  postCategory,
  putCategory,
} from "./../controllers/categorys";

const router = Router();

router.get("/", getCategorys);
router.get("/:id", getCategory);
router.post("/", postCategory);
router.put("/:id", putCategory);
router.delete("/:id", deleteCategory);

export default router;
