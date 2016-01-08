var React = require('react');

// LensUI React Components
var LensTitleBar = require('./LensTitleBar');
var LensTrackManager = require('./LensTrackManager');
var LensComponentMenu = require('./LensComponentMenu');
var LensComponentActionMenu = require('./LensComponentActionMenu');
var LensComponentViewer = require('./LensComponentViewer');
var LensShareButton = require('./LensShareButton');

// Test Data Injector
var lensComposerTester = require('../../tests/lensComposerTest');
var lensComponentModel = require('../../models/lensComponentModel.js');

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
  updateSelectedNode: function(newSelectedValue) {
    // When the user deletes the first node and there are more nodes in the track, select the new first node
    if (newSelectedValue !== null && newSelectedValue < 0 && this.state.tracks[this.state.currentSelectedTrack].length > 0) {
      newSelectedValue = 0;
    // When the user deletes the first node and there are no more nodes, default to add component
    } else if (newSelectedValue < 0) {
      newSelectedValue = null;
    }
    // Update node with the new selectedNode Value
    this.setState({
      currentSelectedNode: newSelectedValue
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
  addCustomComponent: function(type) {
    var newLibrary = this.state.lensComponentLibrary.slice(0);
    var newComponent = new lensComponentModel(type);
    newLibrary.push(newComponent);
    this.setState({
      lensComponentLibrary: newLibrary
    });
  },
  render: function(){

    var viewPortMenu,
        currentSelectedCmp;

    if(this.state.currentSelectedNode !== null) {
      viewPortMenu = <LensComponentActionMenu currentSelectedCmp={this.state.currentSelectedNode}
                                              deleteComponent={this.deleteComponent}/>;
    } else {
      viewPortMenu = <LensComponentMenu addComponent={this.addComponent}
                                        addCustomComponent={this.addCustomComponent}
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
