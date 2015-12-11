var mongoose = require('mongoose');
var LensNode = require('./models/LensNode.js');

mongoose.connect('mongodb://localhost/lenses', function(){
  console.log("connected");
  var nodes = [{
    name: "Google spreadsheet"
  },{
    name: "Google bar chart"  

  }];

  // TODO: Replace the following
  
  // Clears out the databsase everytime server is restarted.
  mongoose.connection.db.dropDatabase();
  
  // Create set of nodes (currently happens everytime server is restarted).
  nodes.forEach(function(node){
    new LensNode(node).save();

  })

});

