const express = require("express");
const router = express.Router();
const path = require("path")

const serveFile = (res, file) => {
    res.sendFile(path.join(__dirname, "..", "..", "back_office", "admin", file));
}

router.get("/service-edit", (req, res) => {
    serveFile(res, "service_edit.html");
});
router.get("/employe-edit", (req, res) => {
    serveFile(res, "employe_edit.html");
});

router.use(express.static(path.join(__dirname, "..", "..", "back_office", "admin")));

module.exports = router;
