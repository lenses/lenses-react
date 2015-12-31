var React = require('react');
var LensTitleBar = require('./LensTitleBar.jsx');
var LensTrackManager = require('./LensTrackManager.jsx');


module.exports = React.createClass({
  render: function(){
    var initialLensNodes = [{
      name: 'Data Table',
      type: 'dataTable',
      id: 1
    }, {
      name: 'Google Sheet',
      type: 'googleSheet',
      id: 2
    }, {
      name: 'Python Note',
      type: 'pythonNoe',
      id: 3
    }];

    return (
      <div id='lens-composer'>
        <LensTitleBar />
        <LensTrackManager initialLensNodes={initialLensNodes} />
      </div>
    )
  }
})
