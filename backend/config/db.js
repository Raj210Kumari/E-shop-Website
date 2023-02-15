const mongoose=require("mongoose")
require("dotenv").config()

const connect=mongoose.connect(process.env.mongoURL).then((data)=>{
    console.log(`mongoDB is connected with server :${data.connection.host}`)
}).catch((err)=>{
    console.log(err)
})

module.exports={
    connect
}