var express = require('express');
var app = new express();
var parser = require('body-parser'); // Express middleware
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var GroceryItem = require('./models/GroceryItem.js');
var db = require('./database.js');
require('node-jsx').install();

app.set('views', __dirname + '../app');

app.get('/', function(req,res){
  // Render components serverside to remove FOUC
  var application = React.createFactory(require('./../app/components/GroceryItemList.jsx'));
  GroceryItem.find(function(error,doc){
    
    var generated = ReactDOMServer.renderToString(application({
      // Define the props of the application
      items: doc
    }))
    res.render('../../app/index.ejs', {reactOutput: generated});
  })
})
.use(express.static(__dirname + '/../.tmp'))
.listen(7777);

app.use(parser.json()); // Allows express to process JSON requests
app.use(parser.urlencoded({extended:false})); // Allows express to handle posts requests

require('./routes/items.js')(app);