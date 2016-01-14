var React = require('react');
var LensNode = require('./LensNode');
var LensOvalButton = require('./LensOvalButton');
var LensAddButton = require('./LensAddButton');

var LensTrackManager = React.createClass({
  render: function() {
    var lensNodes = [];
    var lensOvalButtonProps = {
      content: 'ADD NEW TRACK',
      margin: '0px 0px 20px 0px',
      backgroundColor: 'white'
    };
    var lensAddButtonProps = {
      content: '+',
      updateSelectedNode:this.props.updateSelectedNode,
      selected:(this.props.currentSelectedNode === null) ? true : false
    };

    // TODO: currently all tracks go to one long list of nodes fix this
    this.props.tracks.forEach(function(track){
      track.forEach(function(cmp, id, trackArr){
        lensNodes.push(<LensNode  node={cmp}
          key={id}
          index={id}
          updateSelectedNode={this.props.updateSelectedNode}
          selected={(this.props.currentSelectedNode == id) ? true : false}
          connector-type={(id == trackArr.length-1) ? 'dashed' : 'solid' } />
                      );

      }, this);
    }, this);

    return (
      <div className='lens-track-manager'>
        <div id='wrapper'>
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

