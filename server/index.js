// import express
const express = require('express');

const path = require("path")

// import dotenv
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.WEB_PORT;

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// handle api requests
app.use("/api/feedback", require("./routes/api/feedback"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/service", require("./routes/api/service"));
app.use("/api/car", require("./routes/api/car"));
app.use("/api/spec", require("./routes/api/spec"));
app.use("/api/contact_info", require("./routes/api/contact_info"));
app.use("/api/car_spec", require("./routes/api/car_specs"));
app.use("/api/gallery", require("./routes/api/gallery"));

app.use("/api/*", require("./routes/api/router_controller").NotFound)

// serve application files
app.use("/", express.static(path.join(__dirname, )));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
