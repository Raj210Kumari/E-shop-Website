const express= require("express")
const app=express()

app.use(express.json())

//routes
const product=require("./routes/product.routes")

app.use("/api/v1",product)


module.exports=app