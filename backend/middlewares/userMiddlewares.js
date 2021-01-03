const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "..", "data", "data.json");
const users = JSON.parse(fs.readFileSync(fileName, "UTF-8"));
const User = require("../models/user-model");
const sendError = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const AppError = require("../helpers/errorClass");
const bcrypt = require("bcryptjs");

const checkReqBody = (req, res, next)=>{
    let validationArray;
    switch(req.url){
        case "/signin":
            validationArray = ["email", "password", "confirmPassword"];
            break;
        case "/login":
            validationArray = ["email", "password"];
            break;
        default:
            return sendError(new AppError(404))
    }
    let result = validationArray.every((key)=>{
        return req.body[key] && req.body[key].trim().length;
    })
    if(!result){
       return sendError(new AppError(400, "Unsuccessful", "Invalid Input"), req, res)
    }
    next();
}
const isEmailValid = (req,res, next)=>{
    let regexForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    let email = req.body.email;
    if(!regexForEmail.test(email)){
        return sendError(new AppError(400, "Unsuccessful", "Invalid Email address"), req, res)
    }
    next();
}

const checkConfirmPassword = (req, res, next)=>{
    if(req.body.password !== req.body.confirmPassword){
        return sendError(new AppError(400, "Unsuccessful", "Passwords do not match"),req, res);
    }
    next();
}

const isEmailUnique = (req, res, next)=>{
    let findUser = users.find((user)=>{
        return user.email == req.body.email;
    })
    if(findUser){
        return sendError(new AppError(401, "Unsuccessful", "User already exists"), req, res);
    }
    next();
}

const createPasswordHash = async (req,res, next) =>{
    try{
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        next();
    
    }catch{
        return sendError(new AppError (500, "Unsuccessful", "Internal Server Error"), req, res);
    }
  
}

const isUserRegistered = (req, res, next)=>{
    let findUser = users.find((user)=>{
        return user.email == req.body.email;
    })
    if(!findUser){
        return sendError(new AppError(422, "Unsuccessful", "Invalid email or user not registered"), req, res);
    }
    req.currentUser = {...findUser};
    next();
}

module.exports.checkReqBody = checkReqBody;
module.exports.isEmailValid = isEmailValid;
module.exports.checkConfirmPassword = checkConfirmPassword;
module.exports.isEmailUnique = isEmailUnique;
module.exports.createPasswordHash = createPasswordHash;
module.exports.isUserRegistered = isUserRegistered;