/* global module require window */

var _ = require("lodash");

var defaultConfig = {
  terminal: {
    cols: 110,
    rows: 9
  },
  autosaveInterval: 1000,
  url: "",
  rpcOptions: {
    reconnectionDelay: 10000,
    reconnectionDelayMax: 10000
  }
};


module.exports = {
  extend: function(config) {
     _.extend(this, defaultConfig, config);
  }
};
