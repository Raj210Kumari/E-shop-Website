const app=require("./app")
const {connect}=require("./config/db")

const dotenv=require("dotenv").config()



let port=process.env.PORT

app.listen(port,async()=>{
    //connecting DB
    await connect
    console.log(`Server is working on port ${port}`)
})