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
app.use(express.urlencoded({ extended: false }));

// routes
// serve application files
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));

app.use("/api/feedback", require("./routes/api/feedback"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/service", require("./routes/api/service"));
app.use("/api/car", require("./routes/api/car"));
app.use("/api/spec", require("./routes/api/spec"));
app.use("/api/contact_info", require("./routes/api/contact_info"));
app.use("/api/car_spec", require("./routes/api/car_specs"));
app.use("/api/gallery", require("./routes/api/gallery"));

app.use("/api/*", require("./routes/api/router_controller").NotFound);

app.all("*", (req, res) => {
    res.status(404);
    if(req.accepts("html")) {
        res.sendFile(path.join(__dirname, "public", "404.html"));
    } else if(req.accepts("json")) {
        res.json({ "erreur": "404 ressource introuvable" });
    } else {
        res.type("txt").send("404 ressource introuvable");
    }
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
