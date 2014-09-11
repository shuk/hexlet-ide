#! /usr/bin/env node --harmony-proxies

/* global require process */

var path = require("path");

var program = require("commander");

program
  // .version("0.0.1")
  .option("-p, --port", "Port")
  // .option("-r, --root-dir [path]", "Root directory", path.normalize)
  .parse(process.argv);

  program.rootDir = path.join(process.cwd(), "src");

require("../src/backend/server")(program);
