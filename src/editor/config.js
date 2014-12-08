/* global module require window */

var _ = require("lodash");

var defaultConfig = {
  terminal: {
    cols: 110,
    rows: 18
  },
  autosaveInterval: 1000,
  rpc: {
    url: "",
    options: {
      reconnectionDelay: 10000,
      reconnectionDelayMax: 10000
    },
    events: {
      connect: _.noop,
      error: _.noop,
      disconnect: _.noop,
      reconnect: _.noop,
      reconnecting: _.noop,
      reconnect_error: _.noop,
      reconnect_failed: _.noop
    }
  },
};


module.exports = {
  extend: function(config) {
     _.extend(this, _.merge(defaultConfig, config));
  }
};
