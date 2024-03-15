const {  addmessage, getMessages } = require("../controllers/messageController");

const router = require("express").Router();

router.route("/addmsg/").post(addmessage)
router.route("/getmsg/").post(getMessages)

module.exports = router;