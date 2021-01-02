const{ verifyToken }= require("../helpers/jwt-token");
const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "..", "data", "data.json");
const users = JSON.parse(fs.readFileSync(fileName, "UTF-8"));
const dotenv = require("dotenv");
dotenv.config({path: "../config.env"});
const sendError = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const AppError = require("../helpers/errorClass");

const protectRoute = async (req, res, next)=>{
    console.log("headers in req body", req.headers.authorization);
  // extract token
    if (!req.headers.authorization) {
        return sendError(
        new AppError(401, "Unsuccessful", "Please login or signup"),
        req,
        res,
        );
    }
  // if headers are there
  let jwtToken = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = await verifyToken(jwtToken, process.env.JWT_SECRET);
  } catch (err) {
    return sendError(
      new AppError(401, "Unsuccesssul", "Invalid Token"),
      req,
      res,
    );
  }

  let { email: currentUser } = users.find((user) => {
    return user.email == decoded.email;
  });
  if (!currentUser) {
    return sendError(
      new AppError(401, "Unsuccesssul", "User not registered"),
      req,
      res,
    );
  }
  // check verification
  req.currentUser = currentUser;
  // give access
  next();
}
module.exports.protectRoute = protectRoute;