const Errorhandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user.model");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail")

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample Id",
      url: "imgURL",
    },
  });
  sendToken(user, 201, res);
});

//login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new Errorhandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Errorhandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//logOut User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//forgot password
exports.forgoPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }

  //get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //creating email for sending request to user to reset password

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/forgot/${resetToken}`;


    const message=  `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requesterd this, please ignore this mail`

    try {
      await sendEmail({
        email:user.email,
        subject:"User password Recovery",
        message,
      })
      res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} sucessfully`
      })
    } catch (err) {
      user.resetPasswordToken=undefined
      user.resetPasswordExpire=undefined

      await user.save({ validateBeforeSave: false });

      return next(new Errorhandler(err.message,500))
    }

});
