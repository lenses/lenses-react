// The app argument is the Express app
var ReactDOMServer = require('react-dom/server');
var React = require('react');
var express = require('express');
var fs = require('fs');

var paths = {
  coreComponents: './app/components/core',
  customComponents: 'app/components/custom'
};

var loadComponents = function (res, path) {
  var payload;
  fs.readdir(path, function(err, files) {
    if(!err) {
      payload = files.map(function(fileName) {
        return {
          type: fileName.split('.')[0],
          name: fileName.split('.')[0].split(/(?=[A-Z])/).join(' ')
        }
      }),
      res.send(payload);
    }
  });
}

module.exports = function (app){
  app.route('/api/components').get(function(req, res) {
    // Provide List of Components

    if(req.query['type'] && req.query['type'] == 'core') {
      //load core components
      loadComponents(res, paths.coreComponents);
    } else if (req.query['type'] && req.query['type']== 'custom') {
      loadComponents(res, paths.customComponents);
    } else {
      loadComponents(res, paths.coreComponents);
    }
  });

  app.route('/lenses')
    .get(function(req, res){
      res.render('list-lenses.hbs', {lensPage: 'list'});
    });

  app.route('/lenses/new')
    .get(function(req,res){
      res.render('create-lens.hbs', {lensPage: 'new'});
    });

  app.route('/lenses/:id/edit')
    .get(function(req, res){
    res.render('create-lens.hbs', {lensId: req.params.id});
  })
};


