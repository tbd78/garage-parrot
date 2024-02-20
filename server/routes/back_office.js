const express = require("express");
const router = express.Router();

router.use("/admin", require("./office/admin"));
router.use("/employee", require("./office/employee"));

module.exports = router;
