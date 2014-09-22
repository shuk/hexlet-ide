/* global module require */
var path = require("path");
var fs = require("fs-extra");
var TreeModel = require("tree-model");
var rimraf = require("rimraf");
var when = require("when");

var shared = require("../shared");
var rpc = require("../rpc");

module.exports = function(io, options) {
  rpc.createServer(io, {
    tree: function() {
      return when.promise(function(resolve) {
        var rootDirName = path.basename(options.rootDir);
        var rootItem = {
          name: rootDirName,
          path: options.rootDir,
          state: "opened",
          id: fs.statSync(options.rootDir).ino
        };
        var tree = new TreeModel(shared.treeOptions);
        var rootNode = tree.parse(rootItem);

        var finder = require("findit")(options.rootDir);

        finder.on("directory", function (dir, stat) {
          var parentNode = rootNode.first(function(n) {
            return path.dirname(dir) === n.model.path;
          });

          if (parentNode) {
            var item = {
              name: path.basename(dir),
              id: stat.ino,
              type: "folder",
              path: dir,
              state: "closed"
            };
            parentNode.addChild(tree.parse(item));
          }
        });

        finder.on("file", function (file, stat) {
          var parentNode = rootNode.first(function(n) {
            return [path.dirname(file), file].indexOf(n.model.path) !== -1;
          });
          var item = {
            name: path.basename(file),
            id: stat.ino,
            type: "file",
            path: file
          };
          parentNode.addChild(tree.parse(item));
        });

        finder.on("end", function () {
          resolve(rootNode.model);
        });
      });
    },

    read: function(path) {
      return fs.readFileSync(path, {encoding: "utf8"});
    },

    touch: function(filepath) {
      var fullPath = path.join(path.dirname(options.rootDir), filepath);
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

    write: function(filepath, content) {
      var fullPath = path.join(path.dirname(options.rootDir), filepath);
      return fs.writeFileSync(fullPath, content);
    },

    unlink: function(folder) {
      var fullPath = path.join(path.dirname(options.rootDir), folder);
      return rimraf.sync(fullPath);
    },

    mkdir: function(folder) {
      var fullPath = path.join(path.dirname(options.rootDir), folder);
      fs.mkdirSync(fullPath);
      var item = {
        name: path.basename(folder),
        id: fs.statSync(fullPath).ino,
        type: "folder",
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
  });
};
