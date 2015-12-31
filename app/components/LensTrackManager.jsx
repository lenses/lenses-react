var React = require('react');
var LensNode = require('./LensNode.jsx');
var LensOvalButton = require('./LensOvalButton.jsx');
var LensAddButton = require('./LensAddButton.jsx');

var LensTrackManager = React.createClass({
  render: function() {
    var lensNodes = [];
    this.props.initialLensNodes.forEach(function(node){
      lensNodes.push(<LensNode node={node} key={node.id} />);
      });
    return (
      <div id='lens-track-manager'>
        <LensOvalButton content='Add New Track'/>
        {lensNodes}
        <LensAddButton />
      </div>
    );
  }
});

module.exports = LensTrackManager;

