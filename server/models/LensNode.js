var mongoose = require('mongoose');

var LensNodeSchema = {
  id: String,
  name: String
};

// Registers the model
var LensNode = mongoose.model('LensNode', LensNodeSchema, "lensNodes");

module.exports = LensNode;