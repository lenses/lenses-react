var express = require('express');

var app = new express();

// app.set('views', __dirname + '/app');
// app.set('view engine', 'html');

app.set('views', __dirname + '/app');
app.engine('html', require('consolidate').handlebars);
app.set('view engine', 'html');

app.get('/', function(req,res){
  res.render('../../app/index.html', {});
})
.listen(7777);