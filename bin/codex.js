#! /usr/bin/env node --harmony-proxies

/* global require process */

var path = require("path");

var program = require("commander");

program
  // .version("0.0.1")
  .option("-p, --port [num]", "Port", 8080)
  .option("-r, --root-dir [path]", "Root directory", process.cwd())
  .parse(process.argv);

  program.rootDir = path.resolve(process.env.TEST_DIR || program.rootDir);
  console.log("info: Root dir is " + program.rootDir);

require("../src/backend/server")(program);
