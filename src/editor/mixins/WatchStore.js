/* global module */
module.exports = function() {
  var stores = Array.prototype.slice.call(arguments);
  return {
    componentDidMount: function() {
      stores.forEach(function(store) {
        store.addChangeListener(this.onStoreChange);
      }, this);
    },

    componentWillUnmount: function() {
      stores.forEach(function(store) {
        store.removeChangeListener(this.onStoreChange);
      }, this);
    },

    updateStateFromFlux: function() {
      var state = this.getFluxState ? this.getFluxState() : {};
      this.setState(state);
    },

    onStoreChange: function() {
      this.updateStateFromFlux();
    },

    getInitialState: function() {
      return this.getFluxState ? this.getFluxState() : {};
    }
  };
};
