var React = require('react');
var LensDataViewer = require('./LensDataViewer.jsx');


var LensComponentViewer = React.createClass({
  render: function() {

    var CurrentlySelectedCmp = null;
    var data = this.props.data;
    var columns = this.props.columns;
    var selectedNode = this.props.currentSelectedNode;
    // 0 is the first element; null defaults to add new component menu
    if (selectedNode !== null)  {
      CurrentlySelectedCmp = this.props.tracks[this.props.currentSelectedTrack][selectedNode];
    }


    return (
      <div className='lens-component-viewer'>
        <CurrentlySelectedCmp.reactCmp updateTransformFunction={this.props.updateTransformFunction} updateColumns={this.props.updateColumns} data={data} columns={this.props.columns}/>
        <LensDataViewer data={data} columns={columns} />
      </div>
    )
  }
});

module.exports = LensComponentViewer;
