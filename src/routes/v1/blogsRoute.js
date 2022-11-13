const router = require("express").Router();
const VerifyToken = require("../../middlewares/VerifyToken");

const {
  getAllBlogs,
  getBlogs,
  updateBlogs,
  deleteBlogs,
  searchBlogs,
  getBlogById,
  postBlogs,
} = require("../../controllers/blogsController");

router.get("/blogs/all", getAllBlogs);
router.get("/blogs", VerifyToken, getBlogs);
router.put("/blogs", VerifyToken, updateBlogs);
router.delete("/blogs", VerifyToken, deleteBlogs);
router.get("/blogs/search", searchBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", VerifyToken, postBlogs);

module.exports = router;
