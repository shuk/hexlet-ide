/** @jsx React.DOM */

var React = require("react/addons");

var TreeBox = require("editor/components/tree/TreeBox");
var TabsBox = require("editor/components/tabs/TabsBox");
var IdeActions = require("editor/actions/IdeActions");

var Ide = React.createClass({
  handleGlobalClick: function() {
    IdeActions.globalClick()
  },

  render: function() {
    return (
      <div className="row" onClick={this.handleGlobalClick}>
        <div className="col-md-4">
          <TreeBox />
        </div>
        <div className="col-md-8">
          <TabsBox />
        </div>
      </div>
    );
  }
});

module.exports = Ide;
