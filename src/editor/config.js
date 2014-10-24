/* global module require window */

var _ = require("lodash");

var defaultConfig = {
  terminal: {
    cols: 110,
    rows: 9
  },
  autosaveInterval: 1000,
  url: ""
};


module.exports = {
  extend: function(config) {
     _.extend(this, defaultConfig, config);
  }
};
