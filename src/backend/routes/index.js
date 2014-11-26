/* global require module */

var express = require("express");

var router = express.Router();

/* GET home page. */
router.get(["/", "/index"], function(req, res) { "use strict";
  res.render("index", {});
});

router.get("/embedded", function(req, res) { "use strict";
  res.render("embedded", {});
});

module.exports = router;
