var React = require('react');
var ReactDOM = require('react-dom'); 
var LensComposer = require('./components/LensComposer.jsx');
// var LensStore = require('./stores/LensStore.jsx');

// var initial = LensStore.getNodes();

//Main render function to attach React component to the dom

var initialLensComponents = ['Google Graph', 'Google Spreadsheet', 'Python Input', 'Bar Graph'];

ReactDOM.render(<LensComposer possible-nodes={initialLensComponents}/>, app);


