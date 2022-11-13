const router = require("express").Router();
const VerifyToken = require("../../middlewares/VerifyToken");
const {
  getAllProducts,
  getProductsSort,
  searchProducts,
  addProduct,
  getProductById,
  deleteProduct,
  updateStockProduct,
  updateProduct,
  updateQuantity,
  getCarts,
  addToCart,
  deleteCart,
  getTeams
} = require("../../controllers/productsController");

router.get("/products/all", getAllProducts);
router.get("/products", getProductsSort);
router.get("/products/search", searchProducts);
router.post("/products", addProduct);
router.get("/products/:id", VerifyToken, getProductById);
router.delete("/products/:id", VerifyToken, deleteProduct);
router.patch("/products/update-stock/:id", VerifyToken, updateStockProduct);
router.put("/products/:id", updateProduct);
router.patch("/products/updateQty/:id", updateQuantity);
router.get("/products/carts", VerifyToken, getCarts);
router.post("/products/carts", VerifyToken, addToCart);
router.delete("/products/carts/:id", VerifyToken, deleteCart);
router.get("/teams", getTeams);

module.exports = router;
