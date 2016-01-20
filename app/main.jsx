var React = require('react');
var ReactDOM = require('react-dom');
var LensComposer = require('./components/ui/LensComposer');
var lensComponentModel = require('./models/lensComponentModel');
var $ = require('jquery');
var Parse = require('parse');

Parse.initialize("4AJgWMJyWKqTWnurFnwlHCalhrFl9AKFAmx5EuUu", "1EzsdsTuTocp9RFlGQPTf0xj36A3GUpCGd3ASf08");
var Lens = Parse.Object.extend('Lens');

var query = new Parse.Query('Lens');

var loadLensHelper = function(cb) {
  if(window.lensId) {
    query.get('fqxo7DnMNL', {
      success: function(lens) {
        console.log('retrieved it');
        cb(lens.get('tracks'));
      },
      error: function(object, error) {
        console.log('failed to retrieve');
      }
    });
  }
}


var loadInitialComponents = function(cb) {
  var initialComponents = [];
  $.get('/api/components', null, function(data) {
    initialComponents = data.map(function(cmp) {
      return new lensComponentModel(cmp.type);
    });
    cb(initialComponents);
  });
};

var lens = new Lens();
var saveHelper = function(tracks) {
  lens.save({tracks: tracks}, {
    success: function(lens) {
      console.log('success');
      console.log(lens);
    },
    error: function(lens, error) {
      console.log(error);
    }
  });
};
//Main render function to attach React component to the dom


// If it is load page then pull the data from the api
// if not just show blank tracks
// initially just save and load tracks




ReactDOM.render(<LensComposer loadLens={loadLensHelper} saveHelper={saveHelper} loadInitialComponents={loadInitialComponents} />, document.getElementById('app'));

