var dispatcher = require('./../dispatcher.js');
var helper = require('./../helpers/RestHelper.js');

function LensStore(){
  var nodes = [];
  var listeners = [];

  // Retrieve items from server
  helper.get("api/nodes")
  .then(function(data){
    nodes = data;
    triggerListeners();
  })

  // Get items
  function getNodes(){
    console.log(nodes);
    return nodes;
  }

  // Add an item to grocery list
  function addLensNode(node){
    nodes.push(node); // Updates front end
    triggerListeners();

    helper.post("api/nodes", node);
  }

  // Delete an item from grocery list
  function deleteLensNode(node){
    var index;
    nodes.filter(function(_node, _index){
      if ( _node.name == node.name){
        index = _index;
      }
    });
    nodes.splice(index, 1);
    triggerListeners();

    helper.del("api/nodes/" + node._id);
  }

  // Mark grocery item as bought
  // function setGroceryItemBought(item, isBought){
  //   var _item = items.filter(function(a){
  //     return a.name == item.name
  //   })[0];
  //   item.purchased = isBought || false;
  //   triggerListeners();

  //   helper.patch("api/items/" + item._id, item);
  // }

  // Updates the listeners array with new listener
  function onChange(listener){
    listeners.push(listener);
  }

  // Everything that has been listening to GroceryItemStore receives a new copy of the items
  function triggerListeners(){
    listeners.forEach(function(listener){
      listener(nodes);
    })
  }

  // Called when the dispatcher dispatches anything
  dispatcher.register(function(event){
    var split = event.type.split(':');
    // Parses through the event type to determine which method to call
    if (split[0] === 'lens-node'){
      switch(split[1]){
        case "add":
          addLensNode(event.payload);
          break;
        case "delete":
          deleteLensNode(event.payload);
          break;
       
      }
    }
  })

  // Public API
  return {
    getNodes: getNodes,
    onChange: onChange
  }

}

module.exports = new LensStore();