// The app argument is the Express app
var ReactDOMServer = require('react-dom/server');
var React = require('react');
var express = require('express');
var fs = require('fs');

var loadCoreComponents = function (res) {
  var payload;
  fs.readdir('./app/components/viz', function(err, files) {
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

var loadCustomComponents = function (res) {
  var payload;
  fs.readdir('./public/components', function(err, files) {
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

  // var LensNode = require('./../models/LensNode.js');

  // // Accessed by React
  // app.route('/api/nodes')
  //   .get(function(req,res){
  //     LensNode.find(function(error,doc){
  //       res.send(doc);  // doc is the array of all nodes
  //     });
  //   })
  //   .post(function(req, res){
  //     var node = req.body;
  //     var lensNode = new LensNode(node);
  //     lensNode.save(function(err,data){
  //       res.status(300).send();
  //     });
  //   });

  // app.route('/api/nodes/:id')
  //   .delete(function(req,res){
  //     LensNode.findOne({
  //       _id: req.params.id
  //     }, function(error,doc){
  //       if (doc){
  //         doc.remove();
  //       }
  //     });
  //   })
  //   .patch(function(req,res){
  //     LensNode.findOne({
  //       _id: req.body._id
  //     }, function(error,doc){
  //       // Loop through all keys in patch object and update the doc
  //       for (var key in req.body){
  //         doc[key] = req.body[key];
  //       }
  //       doc.save();
  //       res.status(200).send();
  //     });
  //   });

  app.route('/api/components').get(function(req, res) {
    // Provide List of Components


    if(req.query['type'] && req.query['type'] == 'core') {
      //load core components
      loadCoreComponents(res);
    } else if (req.query['type'] && req.query['type']== 'custom') {
      loadCustomComponents(res);
    } else {
      console.log("loading all components");
      loadCoreComponents(res);
      loadCustomComponents(res);
    }
  });

  app.route('/lenses/create')
    .get(function(req,res){
      res.render('create-lens.hbs');
    });
};


