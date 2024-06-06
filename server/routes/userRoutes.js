const express=require("express");
const { register, login, setAvatar, getAllUsers, logOut,sendverification,forgotPassword, updatePassword, verifyOtp } = require("../controllers/usercontroller");

const router = express.Router()
router.post("/register", register);
router.post("/login", login);
router.post("/sendverification", sendverification);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", getAllUsers);
router.get("/logout/:id", logOut);
router.post("/forgotPassword", forgotPassword);
router.post("/updatePassword/:id", updatePassword);
router.post("/verifyotp", verifyOtp);











module.exports=router