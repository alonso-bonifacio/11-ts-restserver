import { Router } from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  getProductByName,
  postProduct,
  putProduct,
} from "./../controllers/products";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/pnm/:name", getProductByName);
router.post("/", postProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

export default router;
