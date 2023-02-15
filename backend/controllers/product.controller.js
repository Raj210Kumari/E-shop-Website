const Product=require("../models/product.model")

//display all product
exports.getAllProducts=async(req,res)=>{

    const product=await Product.find()
    res.status(200).json({
        success:true,
        product
    })
}

//get single product detail
exports.singleProductDetails=async(req,res,next)=>{
    const product= await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not Found in DB"
        })
    }
    res.status(200).json({
        success:true,
        product
    })

}

//create product- only admin
exports.createProduct=async(req,res,next)=>{
    const product=await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}

//update product- only admin
exports.updateProduct=async(req,res,next)=>{
    let product=Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not Found in DB"
        })
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
}

//delete product-Admin
exports.deleteProduct=async(req,res,next)=>{
    const product= await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not Found in DB"
        })
    }

    await product.remove()
    res.status(200).json({
        success:true,
        message:"Product deleted from DB"
    })

}