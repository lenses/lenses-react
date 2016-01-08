var $ = require('jquery');

// Load Up Core Lens Models
var comp = require('../components/core/*.jsx', {mode: 'hash'});

// Lens Models
// Should these be singleton Component factories?
// They should take in name and type, and module. module and type mapes to url to
// load components dynamically and that returns a proeprty that is either a
// react function or a custom polymer web component
// the viewer does not care and just show what it gets

var lensComponentModel = function(name, type) {
  function addReactCmp(type, cb) {
    if(comp[type]) {
      cb(comp[type]);
    } else {
      // Require Custom Lens Components which should be in the public folder
      // Unfortunately add them to the global window context for now
      $.getScript('/public/js/' + type +'.js', function() {
        cb(window[type]);
      });
    }
  }
  this.type = type;
  // TODO: Remove this and have it come through the API
  if(!name) {
    name = type.split('.')[0].split(/(?=[A-Z])/).join(' ')
  }
  this.name = name;
  addReactCmp(this.type, function(reactCmp) {
    console.log(reactCmp);
    this.reactCmp = reactCmp;
  }.bind(this));
}

module.exports = lensComponentModel;
