var React = require('react');


var LensComponentViewer = React.createClass({
  render: function() {

    var CurrentlySelectedCmp = this.props.currentSelectedCmp || null;

    return (
      <div className='lens-component-viewer'>
        {(CurrentlySelectedCmp && CurrentlySelectedCmp.reactCmp) ? (<CurrentlySelectedCmp.reactCmp data={this.props.data} columns={this.props.columns}/>) : ""}
      </div>
    )
  }
});

module.exports = LensComponentViewer;
