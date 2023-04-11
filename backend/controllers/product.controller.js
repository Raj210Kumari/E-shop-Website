const Product=require("../models/product.model")
const Errorhandler = require("../utils/errorHandler")
const catchAsyncError=require("../middleware/catchAsyncError")
const { ApiFeatures } = require("../utils/apifetures")

//display all product
exports.getAllProducts=catchAsyncError(async(req,res)=>{

    const resultPerPage=5
    const productCount= await Product.countDocuments()
    // is apifeture is use for implementing search functionality
    const apiFetures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const product=await apiFetures.query
    res.status(200).json({
        success:true,
        product
    })
})

//get single product detail
exports.singleProductDetails=catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req.params.id)

    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message:"Product Not Found in DB"
        // })
        return next(new Errorhandler("Product not found in DB",404))
    }
    res.status(200).json({
        success:true,
        product,
        productCount
    })

})

//create product- only admin
exports.createProduct=catchAsyncError(async(req,res,next)=>{

    req.body.user= req.user.id

    const product=await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})


//update product- only admin
exports.updateProduct=catchAsyncError(async(req,res,next)=>{
    let product=Product.findById(req.params.id)

    if(!product){
        return next(new Errorhandler("Product not found in DB",404))
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true, 
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
})

//delete product-Admin
exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req.params.id)

    if(!product){
        return next(new Errorhandler("Product not found in DB",404))
    }

    await product.remove()
    res.status(200).json({
        success:true,
        message:"Product deleted from DB"
    })

})