const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  singleProductDetails,
} = require("../controllers/product.controller");
const { isAuthUser, authprizeRoles } = require("../middleware/auth");

const router = express.Router();

//all product route
router.route("/products").get(getAllProducts);
//create product route
router
  .route("/product/create")
  .post(isAuthUser, authprizeRoles("admin"), createProduct);
//update product route  and delete product
router
  .route("/product/:id")
  .put(isAuthUser, authprizeRoles("admin"), updateProduct)
  .delete(isAuthUser, authprizeRoles("admin"), deleteProduct)
  .get(singleProductDetails);

module.exports = router;
