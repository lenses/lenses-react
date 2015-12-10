var express = require('express');
var app = new express();
var parser = require('body-parser'); // Express middleware
require('./database.js')

app.set('views', __dirname + '../app');

app.get('/', function(req,res){
  res.render('../../app/index.ejs', {});
})
.use(express.static(__dirname + '/../.tmp'))
.listen(7777);

app.use(parser.json()); // Allows express to process JSON requests
app.use(parser.urlencoded({extended:false})); // Allows express to handle posts requests

require('./routes/items.js')(app);