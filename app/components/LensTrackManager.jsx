var React = require('react');
var LensNode = require('./LensNode.jsx');
var LensOvalButton = require('./LensOvalButton.jsx');
var LensAddButton = require('./LensAddButton.jsx');

var LensTrackManager = React.createClass({
  render: function() {
    var lensNodes = [];
    var lensOvalButtonProps = {
      content: 'ADD NEW TRACK',
      margin: '0px 0px 20px 0px',
      backgroundColor: 'white'
    };

    var lensAddButtonProps = {
      content: '+'
    };

    // Need to know the length for the dash vs solid connector design
    var currentSelectedNode = this.props.currentSelectedNode;
    var lensComponents = this.props.lensComponents;
    var updateSelectedNode = this.props.updateSelectedNode;

    // TODO: currently all tracks go to one long list of nodes fix this
    this.props.tracks.forEach(function(track){
      track.forEach(function(node, id){
        // TODO: Make sure that tracks.node.id is generated dynamically from
        // tracks.node.type mapped to lenscomponent.component.id
        // the if statement is defensively making sure that requirement is adhered to
        if (lensComponents[node.id].type == node.type) {
          lensNodes.push(<LensNode  node={lensComponents[node.id]}
            key={id}
            rank={id}
            updateSelectedNode={updateSelectedNode}
            selected={(currentSelectedNode == id) ? true : false}
            connector-type={(id == this.length-1) ? 'dashed' : 'solid' } />);
        } else {
          // TODO: should catch this and log it at top level
          throw "Tracks Node Types Are Not Correctly Mapped to Lens Components";
        }
      }, track);
    });

    return (
      <div className='lens-track-manager'>
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

