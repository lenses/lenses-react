var React = require('react');


var LensComponentViewer = React.createClass({
  render: function() {

    var componentType = this.props.currentSelectedNodeType;
    var SelectedComponent;

    this.props.initialLensComponents.forEach(function(component) {
      if(component.type == componentType) {
        SelectedComponent = component.reactCmp;
      }
    });

    return (
      <div className='lens-component-viewer'>
        <SelectedComponent data={this.props.data} columns={this.props.columns}/>
      </div>
           )
  }
});

module.exports = LensComponentViewer;
