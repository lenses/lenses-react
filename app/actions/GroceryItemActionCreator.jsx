var dispatcher = require('./../dispatcher.js');

// These actions are called from the components and communicate with the dispatcher
module.exports = {
  add: function(item){
    dispatcher.dispatch({
      payload: item,
      type: 'grocery-item:add' 
    });
  },
  delete: function(item){
    dispatcher.dispatch({
      payload: item,
      type: 'grocery-item:delete' 
    });
  },
  unbuy: function(item){
    dispatcher.dispatch({
      payload: item,
      type: 'grocery-item:unbuy' 
    });
  },
  buy: function(item){
    dispatcher.dispatch({
      payload: item,
      type: 'grocery-item:buy' 
    });
  }
};

