const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute");
const { signUpUser, loginUser} = require("../controllers/user-controller");
const { checkReqBody, isEmailValid, isEmailUnique, createPasswordHash, checkConfirmPassword, isUserRegistered } = require("../middlewares/userMiddlewares");
const { getAllTasks, updateStatus } = require("../controllers/task-controller");

const router = express.Router();

router.route("/signin").post(checkReqBody ,isEmailValid ,isEmailUnique, checkConfirmPassword , createPasswordHash,signUpUser);
router.route("/login").post(checkReqBody,isUserRegistered,loginUser);
router.route("/tasks").get(protectRoute ,getAllTasks);
router.route("/tasks/:id").patch(updateStatus);

module.exports = router;