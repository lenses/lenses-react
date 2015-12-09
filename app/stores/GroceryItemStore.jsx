var dispatcher = require('./../dispatcher.js');

function GroceryItemStore(){
  var items = [{
    name: "Ice Cream"
  },{
    name: "Waffles",
    purchased: true
  }];

  var listeners = [];

  // Get items
  function getItems(){
    return items;
  }

  // Add an item to grocery list
  function addGroceryItem(item){
    items.push(item);
    triggerListeners();
  }

  // Delete an item from grocery list
  function deleteGroceryItem(item){
    var index;
    items.filter(function(_item, _index){
      if ( _item.name == item.name){
        index = _index;
      }
    });
    items.splice(index, 1);
    triggerListeners();
  }

  // Mark grocery item as bought
  function setGroceryItemBought(item, isBought){
    console.log(isBought);
    console.log(item);
    var _item = items.filter(function(a){
      return a.name == item.name
    })[0];
    item.purchased = isBought || false;
    triggerListeners();
  }

  // Updates the listeners array with new listener
  function onChange(listener){
    listeners.push(listener);
  }

  // Everything that has been listening to GroceryItemStore receives a new copy of the items
  function triggerListeners(){
    listeners.forEach(function(listener){
      listener(items);
    })
  }

  // Called when the dispatcher dispatches anything
  dispatcher.register(function(event){
    var split = event.type.split(':');
    // Parses through the event type to determine which method to call
    if (split[0] === 'grocery-item'){
      switch(split[1]){
        case "add":
          addGroceryItem(event.payload);
          break;
        case "delete":
          deleteGroceryItem(event.payload);
          break;
        case "buy":
          setGroceryItemBought(event.payload, true);
          break;
        case "unbuy":
          setGroceryItemBought(event.payload, false);
          break;
      }
    }
  })

  // Public API
  return {
    getItems: getItems,
    onChange: onChange
  }

}

module.exports = new GroceryItemStore();