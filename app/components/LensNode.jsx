var React = require('react');

var LensNode = React.createClass({
  render: function(){
    var lensConnectorClass = 'lens-connector-' + this.props["connector-type"] + '-vertical';
    var lensCircleClass = 'lens-node-circle ';
    lensCircleClass += (this.props.selected) ? "selected" : "";

    return (
      <div className='lens-node'>
        <div className={lensCircleClass} onClick={this.props.updateSelectedNode.bind(null, this.props.rank)}>
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
