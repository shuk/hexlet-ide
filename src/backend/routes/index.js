/* global require module */

var express = require("express");

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", { message: "Express" });
});

module.exports = router;
