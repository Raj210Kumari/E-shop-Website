const express= require("express")
const { registerUser,loginUser, logout, forgoPassword } = require("../controllers/user.controller")
const router=express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgoPassword)
router.route("/logout").get(logout)
.get
module.exports = router