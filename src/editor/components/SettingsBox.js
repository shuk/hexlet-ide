/** @jsx React.DOM */

var React = require("react/addons");
var ModalActions = require("editor/actions/ModalActions");
var ModalStore = require("editor/stores/ModalStore");
var WatchStoreMixin = require("editor/mixins/WatchStore");

var SettingsBox = React.createClass({
  mixins: [ WatchStoreMixin(ModalStore) ],

  getFluxState: function() {
    return ModalStore.getState();
  },

  render: function() {
    return (
      <div className="btn-toolbar" role="toolbar">
        <div className="btn-group">
          <label for="vim_mode"><input id="vim_mode" type="checkbox" /> Vim mode</label>
        </div>
      </div>
    );
  }
});

module.exports = SettingsBox;



