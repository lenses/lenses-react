// The app argument is the Express app
var ReactDOMServer = require('react-dom/server');
var React = require('react');
var express = require('express');
module.exports = function (app){

  var LensNode = require('./../models/LensNode.js');

  // Accessed by React
  app.route('/api/nodes')
    .get(function(req,res){
      LensNode.find(function(error,doc){
        res.send(doc);  // doc is the array of all nodes
      });
    })
    .post(function(req, res){
      var node = req.body;
      var lensNode = new LensNode(node);
      lensNode.save(function(err,data){
        res.status(300).send();
      });
    });

  app.route('/api/nodes/:id')
    .delete(function(req,res){
      LensNode.findOne({
        _id: req.params.id
      }, function(error,doc){
        if (doc){
          doc.remove();
        }
      });
    })
    .patch(function(req,res){
      LensNode.findOne({
        _id: req.body._id
      }, function(error,doc){
        // Loop through all keys in patch object and update the doc
        for (var key in req.body){
          doc[key] = req.body[key];
        }
        doc.save();
        res.status(200).send();
      });
    });

  app.route('/lenses/create')
    .get(function(req,res){
      var application = React.createFactory(require('../../app/components/LensComposer.jsx'));
      LensNode.find(function(error,doc){

        var generated = ReactDOMServer.renderToString(application({
          // Define the props of the application
          nodes: doc
        }));
        res.render('../../app/index.ejs', {initialState: generated});
      });
    });
};


