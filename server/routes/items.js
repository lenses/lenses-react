// The app argument is the Express app
module.exports = function (app){
  
  var GroceryItem = require('./../models/GroceryItem.js');

  // Accessed by React
  app.route('/api/items')
    .get(function(req,res){
      GroceryItem.find(function(error,doc){
        res.send(doc);  // doc is the array of all items
      });
    })
    .post(function(req, res){
      var item = req.body;
      var groceryItem = new GroceryItem(item);
      groceryItem.save(function(err,data){
        res.status(300).send();
      })
    })

  app.route('/api/items/:id')
    .delete(function(req,res){
      GroceryItem.findOne({
        _id: req.params.id
      }, function(error,doc){
        console.log(doc);
        doc.remove();
      });
    })
    .patch(function(req,res){
      GroceryItem.findOne({
        _id: req.body._id
      }, function(error,doc){
        // Loop through all keys in patch object and update the doc
        for (var key in req.body){
          doc[key] = req.body[key];
        }
        doc.save();
        res.status(200).send();
      })
    })
}

