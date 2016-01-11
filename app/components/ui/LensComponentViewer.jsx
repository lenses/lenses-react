var React = require('react');
var LensDataViewer = require('./LensDataViewer.jsx');


var LensComponentViewer = React.createClass({
  getData: function(maxNode, data, counter) {
    counter++
    if (counter <= maxNode) {
      return this.getData(maxNode, this.props.tracks[this.props.currentSelectedTrack][counter].transformData(data), counter);
    }
    return data;
  },
  render: function() {

    var CurrentlySelectedCmp = null;
    var data = this.props.data;
    var columns = this.props.columns;
    var selectedNode = this.props.currentSelectedNode;
    // 0 is the first element; null defaults to add new component menu
    if (this.props.currentSelectedNode !== null)  {
      CurrentlySelectedCmp = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];
    }

    var counter =-1
    var dataAtNode = this.getData(selectedNode, data, counter);

    return (
      <div className='lens-component-viewer'>
        <CurrentlySelectedCmp.reactCmp updateTransformFunction={this.props.updateTransformFunction} updateColumns={this.props.updateColumns} data={dataAtNode} columns={this.props.columns}/>
        <LensDataViewer data={dataAtNode} columns={columns} />
      </div>
    )
  }
});

module.exports = LensComponentViewer;
