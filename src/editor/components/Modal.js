/** @jsx React.DOM */

var React = require("react/addons");
var TreeActions = require("editor/actions/TreeActions");

var Modal = React.createClass({

    handleCloseModal: function() {
        TreeActions.closeModal();
    },

    handleApply: function() {
        this.props.onApply();
        TreeActions.closeModal();
    },

    render: function() {
        var modalStyle = {
            position: "absolute",
            "zIndex": "100"
            // top: this.props.y,
            // left: this.props.x
        };

        return (
            <div className="modal-dialog" style={modalStyle}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={this.handleCloseModal}>
                            <span aria-hidden="true">×</span><span className="sr-only">Close</span>
                        </button>
                        <h4 className="modal-title">{this.props.title}</h4>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleCloseModal}>Close</button>
                        <button type="button" onClick={this.handleApply} className="btn btn-primary">Apply</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Modal;


