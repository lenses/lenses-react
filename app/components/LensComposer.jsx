var React = require('react');
var LensTitleBar = require('./LensTitleBar.jsx');
var LensTrackManager = require('./LensTrackManager.jsx');


module.exports = React.createClass({
  render: function(){
    var initialLensNodes = [{
      name: 'DATA TABLE',
      type: 'dataTable',
      id: 1
    }, {
      name: 'GOOGLE SHEET',
      type: 'googleSheet',
      id: 2
    }, {
      name: 'PYTHON NOTE',
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
