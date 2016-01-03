var React = require('react');
var LensTitleBar = require('./LensTitleBar.jsx');
var LensTrackManager = require('./LensTrackManager.jsx');
var LensComponentMenu = require('./LensComponentMenu.jsx');
var LensComponentViewer = require('./LensComponentViewer.jsx');
var LensShareButton = require('./LensShareButton.jsx');


module.exports = React.createClass({
  render: function(){
    var initialLensComponents = [{
      name: 'DATA TABLE',
      type: 'dataTable',
      id: 1
    }, {
      name: 'GOOGLE SHEET',
      type: 'googleSheet',
      id: 2
    }, {
      name: 'PYTHON NOTEBOOK',
      type: 'pythonNoe',
      id: 3
    },{
      name: 'MAPBOX',
      type: 'mapbox',
      id: 4
    }];

    return (
      <div id='lens-composer'>
        <LensTitleBar />
        <LensShareButton />
        <LensTrackManager initialLensComponents={initialLensComponents} />
        <div className='lens-viewport'>
          <LensComponentMenu initialLensComponents={initialLensComponents} />
          <LensComponentViewer />
        </div>
      </div>
    )
  }
})
