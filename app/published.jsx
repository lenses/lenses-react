var React = require('react')
, ReactDOM = require('react-dom')
, Parse = require('parse')
, LensPublishedComponentViewer = require('./components/ui/LensPublishedComponentViewer.jsx');

Parse.initialize("4AJgWMJyWKqTWnurFnwlHCalhrFl9AKFAmx5EuUu", "1EzsdsTuTocp9RFlGQPTf0xj36A3GUpCGd3ASf08");

var query = new Parse.Query('Lens');

var loadLensHelper = function(cb) {
  if(window.lensId) {
    query.get(window.lensId, {
      success: function(lens) {
        cb(lens);
      },
      error: function(object, error) {
        cb(error);
      }
    });
  }
}

ReactDOM.render(<LensPublishedComponentViewer loadLens={loadLensHelper} />, document.getElementById('published-component'));

