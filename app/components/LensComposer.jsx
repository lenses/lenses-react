var React = require('react');

// LensUI React Components
var LensTitleBar = require('./LensTitleBar.jsx');
var LensTrackManager = require('./LensTrackManager.jsx');
var LensComponentMenu = require('./LensComponentMenu.jsx');
var LensComponentActionMenu = require('./LensComponentActionMenu.jsx');
var LensComponentViewer = require('./LensComponentViewer.jsx');
var LensShareButton = require('./LensShareButton.jsx');


// LensViz React Components
// Custom components should be loaded on the fly
var LensGoogleBarGraph = require('./viz/LensGoogleBarGraph.jsx');
var LensGooglePieChart = require('./viz/LensGooglePieChart.jsx');


module.exports = React.createClass({
  getInitialState: function() {
    return {
      lensComponents: [],
      data: [],
      columns: [],
      currentSelectedNode: null,
      tracks: []
    }
  },
  testData: function (){
    this.state.lensComponents = [{
      name: 'GOOGLE PIE CHART',
      type: 'LensGooglePieChart',
      reactCmp: LensGooglePieChart
    }, {
      name: 'GOOGLE BAR GRAPH',
      type: 'LensGoogleBarGraph',
      reactCmp: LensGoogleBarGraph
    }, {
      name: 'PYTHON NOTEBOOK',
      type: 'LensPythonNoteBook',
      reactCmp: null
    },{
      name: 'MAPBOX',
      type: 'LensMapBox',
      reactCmp: null
    }, {
      name: 'GOOGLE SHEET',
      type: 'LensGoogleSheet',
      reactCmp: null
    }];
    this.state.data = [['Goats', 5], ['Burrito',3], ['Olives', 1], ['Zucchini', 1], ['Pepperoni',2]];
    this.state.columns = [['string', 'Topping'] , ['number' , 'Slices']];
    this.state.tracks.push([
      {
        type:'LensGooglePieChart',
        id: 0
      }, {
        type:'LensGoogleBarGraph',
        id: 1
      }, {
        type:'LensGoogleSheet',
        id: 4
      }, {
        type:'LensGoogleBarGraph',
        id: 1
      }]);
    this.state.currentSelectedNode = null;
  },
  componentWillMount: function() {
    //add test data once
    this.testData();
  },
  updateSelectedNode: function(key) {
    this.setState({
      currentSelectedNode: key
    });
  },
  render: function(){

    var viewPortMenu;

    if(this.state.currentSelectedNode !== null) {
      viewPortMenu = <LensComponentActionMenu />;
    } else {
      viewPortMenu = <LensComponentMenu lensComponents={this.state.lensComponents} />;
    }

    return (
      <div id='lens-composer'>
        <LensTitleBar />
        <LensShareButton />
        <LensTrackManager currentSelectedNode={this.state.currentSelectedNode}
                          tracks={this.state.tracks}
                          updateSelectedNode={this.updateSelectedNode}
                          lensComponents={this.state.lensComponents}/>
        <div className='lens-viewport'>
          {viewPortMenu}
          <LensComponentViewer tracks={this.state.tracks}
                               currentSelectedNode={this.state.currentSelectedNode}
                               lensComponents={this.state.lensComponents}
                               data={this.state.data}
                               columns={this.state.columns}/>
        </div>
      </div>
    )
  }
})
