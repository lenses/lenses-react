var express = require('express');

var app = new express();

app.set('views', __dirname + '/app');
app.engine('html', require('consolidate').handlebars);
app.set('view engine', 'ejs');

app.get('/', function(req,res){
  res.render('../../app/index.ejs', {});
})
.listen(7777);