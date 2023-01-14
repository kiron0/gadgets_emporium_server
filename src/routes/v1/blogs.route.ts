import { Router } from "express";
const router: Router = Router();
import { VerifyAdmin } from "../../middlewares/VerifyAdmin";
import { VerifyToken } from "../../middlewares/VerifyToken";

import {
  getAllBlogs,
  getBlogs,
  updateBlogs,
  deleteBlogs,
  searchBlogs,
  getBlogById,
  postBlogs,
} from "../../controllers/blogs.controller";

router.get("/blogs/all", getAllBlogs);
router.get("/blogs", VerifyToken, getBlogs);
router.put("/blogs", VerifyToken, updateBlogs);
router.delete("/blogs", VerifyToken, deleteBlogs);
router.get("/blogs/search", searchBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", VerifyToken, postBlogs);

export default router;
