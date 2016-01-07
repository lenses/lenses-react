var $ = require('jquery');

var comp = {
  LensGoogleBarChart: require('../components/viz/LensGoogleBarChart.jsx'),
  LensGooglePieChart: require('../components/viz/LensGooglePieChart.jsx')
};

// Require Custom Lens Components
var lensComponentModel = function(name, type) {
  this.name = name;
  this.type = type;
  this.reactCmp = addReactCmp(this.type);
  function addReactCmp(type) {
    return comp[type]
  }
}
module.exports = lensComponentModel;
