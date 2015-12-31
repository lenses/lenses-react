var React = require('react');

var LensNode = React.createClass({
  render: function(){
    return (
      <div className='lens-node'>
        <div className='lens-node-name'>
          <h4>{this.props.node.name}</h4>
        </div>
        <button className='lens-node-delete'>&times;</button>
      </div>
    );
  }
})

module.exports = LensNode;
