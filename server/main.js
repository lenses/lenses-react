var express = require('express');
var parser = require('body-parser'); // middleware to parse data from post requests
var cons = require('consolidate');

var app = new express();

// Get the port from the PORT env variable to support Heroku and custom terminal vconfigs
// or hard code it if it's not available
var port = process.env.PORT || 7777;

require('node-jsx').install();

app.use(parser.json()); // Allows express to process JSON requests
app.use(parser.urlencoded({extended:false})); // Allows express to handle posts requests
// Set hbs engine to cons.handelbars
app.engine('hbs', cons.handlebars);

// Set the view engine and view directory
app.set('view engine', 'hbs');
app.set('views', __dirname + '/../app/views');
app.use('/public', express.static(__dirname + '/../public'));

// Set up routes
app.get('/', function(req,res){
  res.render('index');
});

require('./routes/nodes.js')(app);

app.listen(port);


