// This is FLUX. It registers listeners and then sends events to those listeners.

var guid = require('guid'); // Generates random strings
var listeners = {};

module.exports = {
  // Registers callbacks in the listeners object
  register: function(cb){
    var id = guid.raw(); // Unique ID for callback
    listeners[id] = cb;
    return id;

  },
  // Loops through all listeners, calling each one and passing the payload
  dispatch: function(payload){
    console.info("Dispatching...", payload);
    for (var id in listeners){
      var listener = listeners[id];
      listener(payload);
    }

  }
};