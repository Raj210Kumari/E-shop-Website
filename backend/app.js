const express= require("express")
const app=express()
const cookieParser= require("cookie-parser")

const errorMiddleware=require("./middleware/error")

app.use(express.json())
app.use(cookieParser())

//routes
const product=require("./routes/product.routes")
const user = require("./routes/user.routes")

app.use("/api/v1",product)
app.use("/api/v1",user)

//error middleware
app.use(errorMiddleware)

module.exports=app