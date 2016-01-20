var React = require('react');
var ReactDOM = require('react-dom');
var LensComposer = require('./components/ui/LensComposer');
var lensComponentModel = require('./models/lensComponentModel');
var $ = require('jquery');
var Parse = require('parse');
var LensList = require('./components/ui/LensList.jsx');

Parse.initialize("4AJgWMJyWKqTWnurFnwlHCalhrFl9AKFAmx5EuUu", "1EzsdsTuTocp9RFlGQPTf0xj36A3GUpCGd3ASf08");
var Lens = Parse.Object.extend('Lens');
var lens = new Lens();
var query = new Parse.Query('Lens');

var loadLensHelper = function(cb) {
  if(window.lensId) {
    query.get(window.lensId, {
      success: function(lens) {
        cb(lens.get('tracks'));
      },
      error: function(object, error) {
        cb(error);
      }
    });
  }
}

var loadAllLenses = function(cb) {
  query.find({
    success: function(result) {
      cb(result);
    },
    error: function(object, error) {
      console.log("couldn't load all lenses");
    }
  })
};

var loadInitialComponents = function(cb) {
  var initialComponents = [];
  $.get('/api/components', null, function(data) {
    initialComponents = data.map(function(cmp) {
      return new lensComponentModel(cmp.type);
    });
    cb(initialComponents);
  });
};

var saveHelper = function(lensObj, cb) {
  lens.save(lensObj, {
    success: function(lens) {
      cb(lens);
      alert('Lens Saved! ID:' + lens.id)
    },
    error: function(lens, error) {
      alert('Failed to save');
    }
  });
};

if(document.getElementById('lens-list')) {
  ReactDOM.render(<LensList lenses={loadAllLenses}/>, document.getElementById('lens-list'));

} else if(document.getElementById('app')) {
  ReactDOM.render(<LensComposer loadLens={loadLensHelper}
    saveLens={saveHelper}
    loadInitialComponents={loadInitialComponents} />, document.getElementById('app'));
}

