var React = require('react');
var action = require('./../actions/LensActionCreator.jsx');

module.exports = React.createClass({
  delete: function(e){
    e.preventDefault();
    action.delete(this.props.node);
  },
  render: function(){
    return (
      <div>
        <div>
          <h4>{this.props.node.name}</h4>
        </div>
        <form onSubmit={this.delete}><button>&times;</button></form>
      </div>
    )
  }
})