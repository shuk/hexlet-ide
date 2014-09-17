/** @jsx React.DOM */

var React = require("react/addons");

var TreeBox = require("editor/components/tree/TreeBox");
var TabsBox = require("editor/components/tabs/TabsBox");
var ContextMenu = require("editor/components/ContextMenu");
var Modal = require("editor/components/Modal");

var TerminalsBox = require("editor/components/terminals/TerminalsBox");
var IdeActions = require("editor/actions/IdeActions");

var Ide = React.createClass({
  handleGlobalClick: function() {
    IdeActions.globalClick()
  },

  render: function() {
    return (
      <div>
        <ContextMenu />
        <Modal />
        <div className="row" onClick={this.handleGlobalClick}>
          <div className="col-md-4 file-tree-box">
            <TreeBox />
          </div>
          <div className="col-md-8 tabs-box">
            <TabsBox />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 terminals-box">
            <TerminalsBox />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Ide;
