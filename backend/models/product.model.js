const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    image:String,
    category:String,
    stock:Number,
    rating:Number,
    reviews:String,
    createdAt:{
        type:Date,
        default:Date.now
    }

})

// module.exports={
//     productSchema
// }
module.exports=mongoose.model("Product",productSchema)