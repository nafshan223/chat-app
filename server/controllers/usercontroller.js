const User = require("../model/usermodels");
const bcrypt = require("bcrypt");
const Token = require("../model/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
module.exports.forgotPassword = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or email", status: false });
    const emailCheck = await User.findOne({ email });
    const result = await sendEmail(req.body.email, "Verify Email", `http://localhost:3000/ResetPassword/${user._id}`);

    if (!emailCheck)

      return res.json({ msg: "Email  invalid", status: false });
      
        return res.json({ status: true, result });
  } catch (ex) {
    next(ex);
  }
};



module.exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ status: false, message: 'Missing id or password' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const passwordUpdate = await User.findByIdAndUpdate(
      id, 
      { password: hashedPassword }, 
      { new: true }
    );

    if (!passwordUpdate) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    return res.json({ status: true, passwordUpdate });
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Internal Server Error', error: error.message });
  }
};




module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }

    // Check if the email already exists
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    // Generate OTP and its expiration time
    const otp = crypto.randomInt(1000, 9999).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      otp,
      otpExpires,
    });
    delete user.password;
    // Send verification email
    const result = await sendEmail(email, "Verify Email", `Your verification code is ${otp}`);
    console.log(result);

    res.status(201).json({
      message: "OTP is sent to your email. Please verify.",
      status: true,user
      
    });
  } catch (ex) {
    next(ex);
  }
};


module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.sendverification = async (req, res) => {
  try {
    console.log(req.body.email);
    let user = await User.findOne({ email: req.body.email });
    
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
        const otp = crypto.randomInt(1000, 9999).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user = new User({
      email: req.body.email,
      otp,
      otpExpires
    });

    await user.save();
    const result = await sendEmail(req.body.email, "Verify Email", `Your verification code is ${otp}`);
    console.log(result);
  
    res
      .status(201)
      .send({ message: "otp is sent to your email please verify" });
  } catch (ex) {
    console.log(ex);
    res.status(500).send({ message: "Internal Server Error" });
  }
};



module.exports.verifyOtp = async (req, res) => {
  try {
    const {  otp } = req.body;

    let user = await User.findOne({ otp: req.body.otp });

    // Check if the OTP matches and is still valid
    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid, update the user's status
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
