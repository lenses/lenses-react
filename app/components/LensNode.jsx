var React = require('react');

var LensNode = React.createClass({
  render: function(){
    var lensConnectorClass = 'lens-connector-' + this.props["connector-type"] + '-vertical';
    return (
      <div className='lens-node'>
        <div className='lens-node-circle'>
        </div>
        <div className='lens-node-name'>
          <h4>{this.props.node.name}</h4>
        </div>
        <hr className={lensConnectorClass}  />
        <button className='lens-node-delete'>&times;</button>
      </div>
    );
  }
})

module.exports = LensNode;
