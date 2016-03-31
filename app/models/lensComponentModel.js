var $ = require('jquery');

// Load Up Core Lens Models
var comp = require('../components/core/*.jsx', {mode: 'hash'});


// Takes in type which is the filename and
// returns the name and loads the cmp function

var lensComponentModel = function(type, finishedGettingComponent, customInputOptions) {
  this.type = type;
  // Remove the extension, match groups that start with a capital letter
  // join them into one word
  // this is fragile on non-linux systems
  this.name = type.split('.')[0].split(/(?=[A-Z])/).join(' ');
  // The Default transform is a no-op
  this.transformData = function(data) {
    return data;
  }
  if(comp[type]) {
    // Load Bundled Components
    this.reactCmp = comp[type];
    this.metaData = comp[type].getMetadata();
  } else {
    // Load Custom Components which should be in the public/js folder
    // For now load them from the Global object but we'll move them
    // to a LensObject to avoid polluting the namespcae
    // $.getScript('/public/js/' + type +'.js')
    // .done(function() {
    //   this.reactCmp = window[type];
    // }.bind(this))
    // .error(function() {
    //   this.reactCmp = null;
    // }.bind(this))
    // .always(function(){
    //   if(typeof finishedGettingComponent == 'function'){
    //     finishedGettingComponent(this);
    //   }
    // }.bind(this));
  }
  this.customInputOptions = customInputOptions || {};
}

module.exports = lensComponentModel;
