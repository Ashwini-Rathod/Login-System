const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const app = express();
dotenv.config({path: "./config.env"});
const { protectRoute } = require("./middlewares/protectRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.get("/dashboard", protectRoute, (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
})
app.listen(process.env.PORT, ()=>{
    console.log("Listening to the port")
})


