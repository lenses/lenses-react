var React = require('react');
var ReactDOM = require('react-dom'); 
var GroceryItemList = require('./components/GroceryItemList.jsx');
var groceryItemStore = require('./stores/GroceryItemStore.jsx');

var initial = groceryItemStore.getItems();

// Main render function to attach React component to the dom
function render(){
  ReactDOM.render(<GroceryItemList items={initial}/>, app);  
}

// Re-render when store changes
groceryItemStore.onChange(function(items){
  initial = items;
  render();
})

render();