const Errorhandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt=require("jsonwebtoken")
const User = require("../models/user.model")

exports.isAuthUser= catchAsyncError(async (req,res,next)=>{
    const {token}= req.cookies
    // console.log(token)
    if(!token){
        return next(new Errorhandler("Please Login to access this",401))
    }

    const decodeData=jwt.verify(token,process.env.JWT_SECRET)

    req.user=await User.findById(decodeData.id)

    next()
})

exports.authprizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Errorhandler(`Role :${req.user.role} is not allowed to access this resource`,403))
        }
        next()
    }
}