var $ = require('jquery');

var comp = {
  LensGoogleBarChart: require('../components/viz/LensGoogleBarChart.jsx'),
  LensGooglePieChart: require('../components/viz/LensGooglePieChart.jsx')
};

// Require Custom Lens Components
var lensComponentModel = function(name, type) {
  function addReactCmp(type, cb) {
    if(comp[type]) {
      cb(comp[type]);
    } else {
      $.getScript('/public/components/' + type + '.js', function() {
        cb(window[type]);
      });
    }
  }
  this.name = name;
  this.type = type;
  addReactCmp(this.type, function(reactCmp) {
    this.reactCmp = reactCmp;
  }.bind(this));
}
module.exports = lensComponentModel;
