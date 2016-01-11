var React = require('react');


var LensDataViewer = React.createClass({
  render: function() {
    return (
      <div className='lens-data-viewer'>
        <div>Current Data:</div>
        <div>Columns: {this.props.columns}</div>
        <div>Data: {this.props.data}</div>
      </div>
    )
  }
});

module.exports = LensDataViewer;
