/** @jsx React.DOM */

var Codex = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="fuelux">
                        <ul className="tree tree-folder-select" role="tree" id="myTree">
                            <li className="tree-branch" data-template="treebranch" role="treeitem" aria-expanded="false">
                                <div className="tree-branch-header">
                                    <button className="glyphicon icon-caret glyphicon-play"><span className="sr-only">Open</span></button>
                                    <button className="tree-branch-name">
                                        <span className="glyphicon icon-folder glyphicon-folder-close"></span>
                                        <span className="tree-label">label</span>
                                    </button>
                                </div>
                                <ul className="tree-branch-children" role="group"></ul>
                                <div className="tree-loader" role="alert">Loading...</div>
                            </li>
                            <li className="tree-item" data-template="treeitem" role="treeitem">
                                <button className="tree-item-name">
                                    <span className="glyphicon icon-item fueluxicon-bullet"></span>
                                    <span className="tree-label"></span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = Codex;
