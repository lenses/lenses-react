var React = require('react');
var action = require('./../actions/LensActionCreator.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      input: ''
    }
  },
  // Updates the state of input when the value changes (otherwise the template is read-only)
  handleInputName: function(e){
    this.setState({
      input: e.target.value
    });
  },
  addNode: function(e){
    e.preventDefault();
    action.add({
      name: this.state.input
    });
    this.setState({
      input: ''
    })
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.addNode}>
          <input value={this.state.input} onChange={this.handleInputName}/>
          <button> Add Node </button>
        </form>
      </div>
    )
  }
})