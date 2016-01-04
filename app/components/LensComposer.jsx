var React = require('react');
var LensTitleBar = require('./LensTitleBar.jsx');
var LensTrackManager = require('./LensTrackManager.jsx');
var LensComponentMenu = require('./LensComponentMenu.jsx');
var LensComponentActionMenu = require('./LensComponentActionMenu.jsx');
var LensComponentViewer = require('./LensComponentViewer.jsx');
var LensShareButton = require('./LensShareButton.jsx');


// Load all base viz components.
// Custom components should be loaded on the fly
var LensGoogleBarGraph = require('./viz/LensGoogleBarGraph.jsx');

module.exports = React.createClass({
  render: function(){
    var initialLensComponents = [{
      name: 'DATA TABLE',
      type: 'dataTable',
      reactCmp: null,
      id: 0
    }, {
      name: 'GOOGLE SHEET',
      type: 'LensGoogleSheet',
      reactCmp: null,
      id: 1
    }, {
      name: 'PYTHON NOTEBOOK',
      type: 'LensPythonNoteBook',
      reactCmp: null,
      id: 2
    },{
      name: 'MAPBOX',
      type: 'LensMapBox',
      reactCmp: null,
      id: 3
    }, {
      name: 'GOOGLE BAR GRAPH',
      type: 'LensGoogleBarGraph',
      reactCmp: LensGoogleBarGraph,
      id: 4
    }];

    var data = [['Mushrooms', 3], ['Onions',1], ['Olives', 1], ['Zucchini', 1], ['Pepperoni',2]];
    var columns = [['string', 'Topping'] , ['number' , 'Slices']];

    var currentSelectedNode = 4;
    var currentSelectedNodeType = (currentSelectedNode) ? initialLensComponents[currentSelectedNode].type : null;


    return (
      <div id='lens-composer'>
        <LensTitleBar />
        <LensShareButton />
        <LensTrackManager currentSelectedNode={currentSelectedNode} initialLensComponents={initialLensComponents} />
        <div className='lens-viewport'>
          {(currentSelectedNode) ? (<LensComponentActionMenu />) : (<LensComponentMenu initialLensComponents={initialLensComponents} />)}
          <LensComponentViewer initialLensComponents={initialLensComponents} currentSelectedNodeType={currentSelectedNodeType} data={data} columns={columns}/>
        </div>
      </div>
    )
  }
})
