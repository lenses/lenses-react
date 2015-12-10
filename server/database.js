var mongoose = require('mongoose');
var GroceryItem = require('./models/GroceryItem.js');

mongoose.connect('mongodb://localhost/grocery', function(){
  console.log("connected");
  var items = [{
    name: "Ice Cream"
  },{
    name: "Waffles",
    purchased: true
  }];

  // Clears out the databsase everytime server is restarted.
  mongoose.connection.db.dropDatabase();
  
  // Create initial grocery list in DB (currently happens everytime server is restarted).
  items.forEach(function(item){
    new GroceryItem(item).save();

  })

});

