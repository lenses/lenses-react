var React = require('react');
var action = require('./../actions/LensActionCreator.jsx');

var styles = {
  saveButton: {
    cursor: "pointer",
    width: "100%",
    height: "100%"
  }
};

var SaveFormModal = React.createClass({
  saveLens: function(e){
    e.preventDefault();
    action.save({
      // TODO: pass the lens info to the action creator
      // email: this.state.email,
      // title: this.state.title,
      // name: this.state.name,
      // nodes: this.state.nodes
      // 
    });
  },
  render: function(){
    // TODO: insert modal here, which calls saveLens when submitted.
    return (
      <div></div>
    )
  }
});

var SaveButton = React.createClass({
  requestToSave: function(e){
    // TODO: Opens emailForm modal
    console.log("Open save modal");
  },
  render: function(){
    // Replace save w/image
    return (
      <div style={styles.saveButton} onClick={this.requestToSave}>
        Save
        <div><SaveFormModal/></div>
      </div>
    )
  }
})


module.exports = SaveButton;