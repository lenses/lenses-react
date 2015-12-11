var React = require('react');
var action = require('./../actions/LensActionCreator.jsx');

var styles = {
  
};

// Renders a node within a track
var TrackNode = React.createClass({
  // When clicked, set the state of that node to "active" --> to be displayed in main frame
  // If there is no component in that node, it shows a plus symbol and triggers display the component options menu in the main frame
  render: function(){
    // Display circle w/name of component
    return (
      <div></div>
    )
  }
});

// Button to add a track
var AddTrack = React.createClass({
  render: function(){
    return (
      <div></div>
    )
  }
});

// Button to merge tracks
var MergeTracks = React.createClass({
  render: function(){
    return (
      <div></div>
    )
  }
});

// Renders a single track
var SingleTrack = React.createClass({
  render: function(){
    // Repeats TrackNode for all nodes in a track
    return (
      <div></div>
    )
  }
});

// Renders all tracks
var LensTracks = React.createClass({
  render: function(){
    // Displays AddTrack / MergeTrack buttons
    // Repeats number of SingleTracks given state.nodes data
    return (
      <div></div>
    )
  }
});

module.exports = LensTracks;