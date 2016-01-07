var React = require('react');

// LensUI React Components
var LensTitleBar = require('./LensTitleBar.jsx');
var LensTrackManager = require('./LensTrackManager.jsx');
var LensComponentMenu = require('./LensComponentMenu.jsx');
var LensComponentActionMenu = require('./LensComponentActionMenu.jsx');
var LensComponentViewer = require('./LensComponentViewer.jsx');
var LensShareButton = require('./LensShareButton.jsx');

// Lens Models
// Should these be singleton Component factories?
// They should take in name and type, and module. module and type mapes to url to
// load components dynamically and that returns a proeprty that is either a
// react function or a custom polymer web component
// the viewer does not care and just show what it gets

// LensViz React Components
// These should be loaded as part of the LensComponetFactory based on polymer or react

// Test Data Injector
var lensComposerTester = require('../tests/lensComposerTest.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      lensComponentLibrary: [],
      data: [],
      columns: [],
      tracks: [[]],
      currentSelectedTrack: 0,
      currentSelectedNode: null
    }
  },
  componentWillMount: function() {
    // Load Initial Components
    this.props.loadInitialComponents(function(initialComponents) {
      this.setState({
        lensComponentLibrary: initialComponents
      });
    }.bind(this));
    // add test data once
    lensComposerTester.loadTestData.call(this);
  },
  updateSelectedNode: function(newSelectedNode) {
    // TODO: Update track once that's available
    if (newSelectedNode !== null && newSelectedNode < 0 && this.state.tracks[this.state.currentSelectedTrack].length > 0) {
      newSelectedNode = 0;
    } else if (newSelectedNode < 0) {
      newSelectedNode = null;
    }
    this.setState({
      currentSelectedNode: newSelectedNode
    });
  },
  addComponent: function(cmp) {
    var tracks  = this.state.tracks.slice(0);
    tracks[this.state.currentSelectedTrack].push(cmp)
    this.setState({
      tracks: tracks
    });
    this.updateSelectedNode(this.state.tracks[this.state.currentSelectedTrack].length-1);
  },
  deleteComponent: function() {
    var tracks = this.state.tracks.slice(0);
    tracks[this.state.currentSelectedTrack].splice(this.state.currentSelectedNode, 1);
    this.setState({
      tracks: tracks
    });
    this.updateSelectedNode((this.state.currentSelectedNode-1));
  },
  render: function(){

    var viewPortMenu,
        currentSelectedCmp;

    if(this.state.currentSelectedNode !== null) {
      viewPortMenu = <LensComponentActionMenu currentSelectedCmp={this.state.currentSelectedNode}
                                              deleteComponent={this.deleteComponent}/>;
    } else {
      viewPortMenu = <LensComponentMenu addComponent={this.addComponent}
                                        lensComponentLibrary={this.state.lensComponentLibrary} />;
    }

    // 0 is the first element; null defaults to add new component menu
    if (this.state.currentSelectedNode !== null)  {
      currentSelectedCmp = this.state.tracks[this.state.currentSelectedTrack][this.state.currentSelectedNode];
    } else {
      currentSelectedCmp = null;
    }

    return (
      <div id='lens-composer'>
        <LensTitleBar />
        <LensShareButton />
        <LensTrackManager     currentSelectedNode={this.state.currentSelectedNode}
                              currentSelectedTrack={this.state.currentSelectedTrack}
                              tracks={this.state.tracks}
                              updateSelectedNode={this.updateSelectedNode} />
        <div className='lens-viewport'>
          {viewPortMenu}
          <LensComponentViewer currentSelectedCmp={currentSelectedCmp}
                               data={this.state.data}
                               columns={this.state.columns} />
        </div>
      </div>
    )
  }
})
