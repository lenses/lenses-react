var React = require('react');


var LensComponentViewer = React.createClass({
  render: function() {

    var selectedComponentType = null;
    var SelectedComponent = null;

    if (this.props.currentSelectedNode !== null) {
      selectedComponentType = this.props.tracks[0][this.props.currentSelectedNode].type;
    }

    this.props.lensComponents.forEach(function(component) {
      if(component.type == selectedComponentType) {
        SelectedComponent = component.reactCmp;
      }
    });


    return (
      <div className='lens-component-viewer'>
        {(SelectedComponent) ? (<SelectedComponent data={this.props.data} columns={this.props.columns}/>) : ""}
      </div>
    )
  }
});

module.exports = LensComponentViewer;
