const express=require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, singleProductDetails } = require("../controllers/product.controller")

const router=express.Router()

//all product route
router.route("/products").get(getAllProducts)
//create product route
router.route("/product/create").post(createProduct)
//update product route  and delete product
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(singleProductDetails)


module.exports=router