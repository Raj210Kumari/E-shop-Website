const express= require("express")
const app=express()

const errorMiddleware=require("./middleware/error")

app.use(express.json())

//routes
const product=require("./routes/product.routes")

app.use("/api/v1",product)

//error middleware
app.use(errorMiddleware)

module.exports=app