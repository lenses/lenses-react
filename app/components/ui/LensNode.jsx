var React = require('react');

var LensNode = React.createClass({
  updateSelectedNode: function() {
    this.props.updateSelectedNode(this.props.index);
  },
  render: function(){
    var lensConnectorClass = 'lens-connector-' + this.props["connector-type"] + '-vertical';
    var lensCircleClass = 'lens-node-circle ';
    lensCircleClass += (this.props.selected) ? "selected" : "";

    return (
      <div className='lens-node'>
        <div className={lensCircleClass} onClick={this.updateSelectedNode}>
        </div>
        <div className='lens-node-name'>
          <h4>{this.props.node.name}</h4>
        </div>
        <hr className={lensConnectorClass}  />
      </div>
    );
  }
})

module.exports = LensNode;
