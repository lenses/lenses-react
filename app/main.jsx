var React = require('react');
var ReactDOM = require('react-dom');
var LensComposer = require('./components/ui/LensComposer');
var lensComponentModel = require('./models/lensComponentModel');
var $ = require('jquery');

var loadInitialComponents = function(cb) {
  var initialComponents = [];
  $.get('/api/components', null, function(data) {
    initialComponents = data.map(function(cmp) {
      return new lensComponentModel(cmp.type);
    });
  // needs to be another api call loading all polymer components
  initialComponents.push(new lensComponentModel('lens-input-paste', function() {}))
  cb(initialComponents);
  });
};
//Main render function to attach React component to the dom

ReactDOM.render(<LensComposer loadInitialComponents={loadInitialComponents} />, document.getElementById('app'));

