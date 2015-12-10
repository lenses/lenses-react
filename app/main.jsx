var React = require('react');
var ReactDOM = require('react-dom'); 
var LensComposer = require('./components/LensComposer.jsx');
var LensStore = require('./stores/LensStore.jsx');

var initial = LensStore.getNodes();

// Main render function to attach React component to the dom
function render(){
  ReactDOM.render(<LensComposer nodes={initial}/>, app);  
}

// Re-render when store changes
LensStore.onChange(function(nodes){
  initial = nodes;
  render();
})

render();