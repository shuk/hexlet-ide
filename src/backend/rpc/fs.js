/* global module require */
var path = require("path");
var fs = require("fs-extra");
var TreeModel = require("tree-model");
var rimraf = require("rimraf");
var when = require("when");

var shared = require("../../shared");

module.exports = function(options) {
  return {
    tree: function(dirPath) {
      dirPath = dirPath ? dirPath : options.rootDir;
      var rootDirName = path.basename(dirPath);
      var rootItem = {
        name: rootDirName,
        path: dirPath,
        state: "opened",
        id: fs.statSync(dirPath).ino,
        type: "directory"
      };

      var children = fs.readdirSync(dirPath);
      rootItem.children = children.map(function(item) {
        var itemPath = path.join(dirPath, item);
        var stat = fs.statSync(itemPath);
        return {
          name: item,
          id: stat.ino,
          type: stat.isDirectory() ? "directory" : "file",
          path: itemPath,
          state: "closed"
        };
      });

      return rootItem;
    },

    read: function(path) {
      return fs.readFileSync(path, {encoding: "utf8"});
    },

    touch: function(filepath) {
      var fullPath = path.join(path.dirname(options.rootDir), filepath);
      if (fs.existsSync(fullPath)) {
        return null;
      }
      fs.writeFileSync(fullPath, "");
      var item = {
        name: path.basename(filepath),
        id: fs.statSync(fullPath).ino,
        type: "file",
        path: fullPath,
        state: "open"
      };
      return item;
    },

    write: function(filePath, content) {
      var fullPath = path.join(path.dirname(options.rootDir), filePath);
      return fs.writeFileSync(fullPath, content);
    },

    unlink: function(folder) {
      var fullPath = path.join(path.dirname(options.rootDir), folder);
      return rimraf.sync(fullPath);
    },

    mkdir: function(folder) {
      var fullPath = path.join(path.dirname(options.rootDir), folder);
      if (fs.existsSync(fullPath)) {
        return null;
      }
      fs.mkdirSync(fullPath);
      var item = {
        name: path.basename(folder),
        id: fs.statSync(fullPath).ino,
        type: "directory",
        path: fullPath,
        state: "closed"
      };
      return item;
    },

    rename: function(filePath, name) {
      return when.promise(function(resolve) {
        var fullPath = path.join(path.dirname(options.rootDir), filePath);
        var newPath = path.join(path.dirname(fullPath), name);
        fs.move(fullPath, newPath, function() {
          var item = {
            id: fs.statSync(newPath).ino,
            path: newPath,
            name: name
          };
          resolve(item);
        });
      });
    }
  };
};
