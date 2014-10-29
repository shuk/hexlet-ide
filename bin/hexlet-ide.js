#!/usr/bin/env node

/* global require process console */

var fs = require("fs");
var path = require("path");

var program = require("commander");

program
.option("-p, --port [num]", "Port", process.env.PORT || 8080)
.option("-r, --root-dir [path]", "Root directory", process.cwd())
.parse(process.argv);

program.rootDir = path.resolve(process.env.TEST_DIR || program.rootDir);
if (!fs.existsSync(program.rootDir)) {
  throw "Directory :" + program.rootDir + " is not exist!";
}

console.log("info: Root dir is " + program.rootDir);

require("../src/backend/server")(program);
