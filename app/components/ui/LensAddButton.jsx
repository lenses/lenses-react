var React = require('react');

var LensAddButton = React.createClass({
  render: function(){
    var lensAddClass = (this.props.selected) ? "lens-selected-button" : "lens-add-button";
    return (
      <div className={lensAddClass} onClick={this.props.updateSelectedNode.bind(null, null)}>
        {this.props.content}
      </div>
    );
  }
});

module.exports = LensAddButton;
