var React = require('react');
var LensNode = require('./LensNode.jsx');
var LensOvalButton = require('./LensOvalButton.jsx');
var LensAddButton = require('./LensAddButton.jsx');

var LensTrackManager = React.createClass({
  render: function() {
    var lensNodes = [];
    var lensOvalButtonProps = {
      content: 'ADD NEW TRACK',
      margin: '0px 0px 20px 0px'
    };

    var lensAddButtonProps = {
      content: '+',
    };

    var lengthOfNodes = this.props.initialLensNodes.length-1;

    this.props.initialLensNodes.forEach(function(node, i){
      lensNodes.push(<LensNode node={node} key={node.id} connector-type={(i == lengthOfNodes) ? 'dashed' : 'solid' } />);
      });

    return (
      <div id='lens-track-manager'>
        <div id='wrapper'>
          <LensOvalButton {...lensOvalButtonProps}/>
          {lensNodes}
          <div id='circle-button-wrapper'>
            <LensAddButton {...lensAddButtonProps} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LensTrackManager;

