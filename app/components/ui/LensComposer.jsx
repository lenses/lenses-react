var React = require('react');

// LensUI React Components
var LensTitleBar = require('./LensTitleBar');
var LensTrackManager = require('./LensTrackManager');
var LensComponentMenu = require('./LensComponentMenu');
var LensComponentActionMenu = require('./LensComponentActionMenu');
var LensComponentViewer = require('./LensComponentViewer');
var LensShareButton = require('./LensShareButton');

// Test Data Injector
var lensComponentModel = require('../../models/lensComponentModel.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      lensComponentLibrary: [],
      data: [],
      columns: [[]],
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
      currentSelectedNode: newSelectedValue,
      data: this.getDataAtNode(newSelectedValue)
    });
  },
  getDataAtNode: function(currentNode) {
    var startNode = -1;
    var data = [];
    var maxNode = (currentNode != null) ? currentNode : startNode;
    return (function recurseData(maxNode, data, startNode) {
      startNode++;
      if (startNode <= maxNode) {
        return recurseData.call(this, maxNode, this.state.tracks[this.state.currentSelectedTrack][startNode].transformData(data), startNode);
      }
      return data;
    }.bind(this))(maxNode, data, startNode)
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
  updateColumns: function(columns) {
    this.setState({
      columns: columns
    });
  },
  updateTransformFunction: function(func) {
    var tracks = this.state.tracks.slice(0);
    var cmp = tracks[this.state.currentSelectedTrack][this.state.currentSelectedNode];
    cmp.transformData = func;
    this.setState({
      tracks: tracks,
      data: this.getDataAtNode(this.state.currentSelectedNode)
    });
  },
  addCustomComponent: function(type) {
    var newLibrary = this.state.lensComponentLibrary.slice(0);
    new lensComponentModel(type, function(newComponent){
      if(newComponent.reactCmp) {
        newLibrary.push(newComponent);
        this.setState({
          lensComponentLibrary: newLibrary
        });
      } else {
        alert('Component Does Not Exist');
      }
    }.bind(this));
  },
  render: function(){

    var viewPortMenu, lensComponentViewer;

    if(this.state.currentSelectedNode !== null) {
      viewPortMenu = <LensComponentActionMenu
        currentSelectedCmp={this.state.currentSelectedNode}
        deleteComponent={this.deleteComponent}/>;
        lensComponentViewer = <LensComponentViewer
            updateColumns={this.updateColumns}
            updateTransformFunction={this.updateTransformFunction}
            currentSelectedNode={this.state.currentSelectedNode}
            currentSelectedTrack={this.state.currentSelectedTrack}
            tracks={this.state.tracks}
            data={this.state.data}
            columns={this.state.columns} />;
    } else {
      viewPortMenu = <LensComponentMenu
        addComponent={this.addComponent}
        addCustomComponent={this.addCustomComponent}
        lensComponentLibrary={this.state.lensComponentLibrary} />;
    }


    return (
      <div id='lens-composer'>
        <LensTitleBar />
        <LensShareButton />
        <LensTrackManager
          currentSelectedNode={this.state.currentSelectedNode}
          currentSelectedTrack={this.state.currentSelectedTrack}
          tracks={this.state.tracks}
          updateSelectedNode={this.updateSelectedNode} />
        <div className='lens-viewport'>
          {viewPortMenu}
          {lensComponentViewer}
        </div>
      </div>
    )
  }
})
