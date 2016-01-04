var React = require('react');
var LensGoogleBarGraph = require('./viz/LensGoogleBarGraph.jsx');


var LensComponentViewer = React.createClass({
  render: function() {
    var data = [{"Mushrooms": 3}, {"Onions":1}, {"Olives": 1}, {"Zucchini": 1}, {"Pepperoni":2}];
    return (
      <div className='lens-component-viewer'>
        <LensGoogleBarGraph data={data}/>
      </div>
           )
  }
});

module.exports = LensComponentViewer;
