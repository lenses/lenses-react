var React = require('react');
var action = require('./../actions/GroceryItemActionCreator.jsx');

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
  addItem: function(e){
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
      <div className="grocery-addItem">
        <form onSubmit={this.addItem}>
          <input value={this.state.input} onChange={this.handleInputName}/>
          <button> Add Item </button>
        </form>
      </div>
    )
  }
})