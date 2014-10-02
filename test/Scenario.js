module.exports = function(getBrowser) {
  return function ScenarioFactory() {
    var runsCallbacks = [];

    function runAfterRpcFinished() {
      var cb = runsCallbacks.shift();
      if (cb) {
        cb();

        getBrowser().wait(runAfterRpcFinished);
      }
      // getBrowser().wait(function() {
      //   getBrowser().wait(function (window) {
      //     return window.hexletIdeActiveRpcRequests === 0;
      //   }, runAfterRpcFinished);
      // });
    }

    return {
      run: function(callback) {
        runsCallbacks.push(callback);
        return this;
      },

      end: function(callback) {
        runsCallbacks.push(callback);
        runAfterRpcFinished();
      }
    };
  };
};
