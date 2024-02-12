// import express
const express = require('express');

// import dotenv
const dotenv = require("dotenv");
dotenv.config();

// import routers
const feedbackRouter = require("./routes/api/feedback");
const userRouter = require("./routes/api/user");
const serviceRouter = require("./routes/api/service");

const app = express();
const port = process.env.WEB_PORT;


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/api", [feedbackRouter, userRouter, serviceRouter]);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
