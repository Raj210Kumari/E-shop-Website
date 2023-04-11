const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    image:String,
    category:String,
    stock:Number,
    rating:Number,
    reviews:String,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

// module.exports={
//     productSchema
// }
module.exports=mongoose.model("Product",productSchema)