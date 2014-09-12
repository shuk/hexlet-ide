#! /usr/bin/env node --harmony-proxies

/* global require process */

var path = require("path");

var program = require("commander");

program
  // .version("0.0.1")
  .option("-p, --port [num]", "Port", 9000)
  .option("-r, --root-dir [path]", "Root directory", process.cwd())
  .parse(process.argv);

  program.rootDir = path.resolve(program.rootDir);
  // console.log(program.port);

require("../src/backend/server")(program);
