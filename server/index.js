// import express
const express = require('express');

const path = require("path")

// import dotenv
const dotenv = require("dotenv");
dotenv.config();

// import routers
const feedbackRoute = require("./routes/api/feedback");
const userRoute = require("./routes/api/user");
const serviceRoute = require("./routes/api/service");
const carRoute = require("./routes/api/car");
const specRoute = require("./routes/api/spec");
const contactInfoRoute = require("./routes/api/contact_info");
const carSpecRoute = require("./routes/api/car_specs");
const galleryRoute = require("./routes/api/gallery");

const app = express();
const port = process.env.WEB_PORT;

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// handle api requests
app.use("/api/feedback", feedbackRoute);
app.use("/api/user", userRoute);
app.use("/api/service", serviceRoute);
app.use("/api/car", carRoute);
app.use("/api/spec", specRoute);
app.use("/api/contact_info", contactInfoRoute);
app.use("/api/car_spec", carSpecRoute);
app.use("/api/gallery", galleryRoute);

app.use("/api/*", require("./routes/api/router_controller").NotFound)

// serve application files
app.use("/", express.static(path.join(__dirname, )));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
