// import express
const express = require('express');

// import dotenv
const dotenv = require("dotenv");
dotenv.config();

// import routers
const feedbackRoute = require("./routes/api/feedback");
const userRoute = require("./routes/api/user");
const serviceRoute = require("./routes/api/service");
const carRoute = require("./routes/api/car");

const app = express();
const port = process.env.WEB_PORT;


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/api/feedback", feedbackRoute);
app.use("/api/user", userRoute);
app.use("/api/service", serviceRoute);
app.use("/api/car", carRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
