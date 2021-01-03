const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "..", "data", "data.json");
const users = JSON.parse(fs.readFileSync(fileName, "UTF-8"));
const User = require("../models/user-model");
const sendError = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const AppError = require("../helpers/errorClass");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const { generatetoken }= require("../helpers/jwt-token");

const signUpUser = (req, res)=>{
    let newUser = new User(req.body.email, req.body.password);
    users.push(newUser);
    fs.writeFile(fileName, JSON.stringify(users, null, 2), (err)=>{
        if(err){
            sendError(new AppError(500, "Internal Error", "Error in completing request"), req, res)
            return err;
        }
        sendResponse(201, "Successful", [newUser], req, res);
    })
}

const loginUser = async (req, res, next)=>{
    try{
        let compare = await bcrypt.compare(req.body.password, req.currentUser.password);
        if(!compare){
            return sendError(new AppError(401, "Unsuccessful", "Incorrect Password"),req, res);
        }
        //generate a jwt token
        let jwtToken = await generatetoken({ email: req.currentUser.email}, process.env.JWT_SECRET, { expiresIn: "1d"});
        res.cookie("jwt", jwtToken); 
        res.status(200).json({
            status: "Successful",
            data: [{
                jwt: jwtToken,
            }]
        })
    }  
    catch(err){
        return sendError(new AppError(500, "Unsucessful", "Internal Error"),req, res);
    }
}

module.exports.signUpUser = signUpUser;
module.exports.loginUser = loginUser;



