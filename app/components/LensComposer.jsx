var React = require('react');
var LensNode = require('./LensNode.jsx');
var LensSave = require('./LensSave.jsx');

// Styles
var theme = {
  primaryColor: "#1EE1D9", // Turquoise
  secondaryColor: "#EE431F", // Red
  textColor: "#000000", // Black
  foregroundColor: "#E0E0E0", // Dark Gray
  accentColor: "#F4F4F4", // Light Gray
  fontFamily: "sans-serif"
};

var styles = {
  composer:  {
    display: "block",
    position: "absolute",
    height: "100%",
    width: "100%",
    fontFamily: "sans-serif"
  },

  nav: {
    width: "100%",
    height: "85px",
    boxSizing: "border-box",
    borderBottom: "3px solid " + theme.accentColor
  },

  saveButton: {
    display: "inlineBlock",
    float: "right",
    height: "100%",
    width: "80px",
    borderLeft: "3px solid " + theme.accentColor,
    boxSizing: "border-box"
  },

  controlPanel: {
    display: "inline-block",
    width: "20%",
    minWidth: "200px",
    height: "100%",
    left: "0",
    top: "0",
    overflow: "hidden",
    borderRight: "3px solid " + theme.accentColor,
    boxSizing: "border-box"
  },

  mainFrame: {
    width: "80%",
    height: "100%",
    overflow: "hidden",
    display: "inline-block",
    float: "right"
  }
};


module.exports = React.createClass({
  render: function(){
    return (
      <div id="composer" style={styles.composer}>
        <div id="nav" style={styles.nav}>
          <div id="save" style={styles.saveButton}>
            <LensSave/>
          </div>
        
        </div>
        <div id="control-panel" style={styles.controlPanel}>
          { this.props.nodes.map(function(node,index){
              return (
                <LensNode node={node} key={"node"+index}/>
              )
            })
          }
        </div>
        <div id="main" style={styles.mainFrame}>
          [current node goes here]
        </div>

        
      </div>
    )
  }
})