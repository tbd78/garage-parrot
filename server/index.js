// import express
const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const SQLiteStore = require('connect-sqlite3')(session);
const passport = require('passport');
// const logger = require("morgan");
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

const fs = require("fs");
const path = require("path")

// import dotenv
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.WEB_PORT;

// create path for session storage if not exists -- 再见
const PATH_DB = path.join(__dirname, "var");
if(fs.existsSync(PATH_DB) === false) {
    fs.mkdirSync(PATH_DB);
}

// just for testing
// app.use("/login", ensureLogIn({redirectTo: '/login'}));

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//for parsing cookies
app.use(cookieParser());
// for session capabilities
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true },//décommenter si https est actif
    store: new SQLiteStore({ dir: PATH_DB })
}));

// routes
// serve application files
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));

app.use(passport.authenticate('session'));

app.use("/auth", require("./middleware/auth"));

app.use("/back-office", ensureLogIn({redirectTo: '/auth'}), require("./routes/back_office"));

app.use("/api/feedback", require("./routes/api/feedback"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/service", require("./routes/api/service"));
app.use("/api/car", require("./routes/api/car"));
app.use("/api/spec", require("./routes/api/spec"));
app.use("/api/contact-info", require("./routes/api/contact_info"));
app.use("/api/car-spec", require("./routes/api/car_specs"));
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
