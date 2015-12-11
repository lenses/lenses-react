var dispatcher = require('./../dispatcher.js');

// These actions are called from the components and communicate with the dispatcher
module.exports = {
  add: function(node){
    dispatcher.dispatch({
      payload: node,
      type: 'lens-node:add' 
    });
  },
  delete: function(node){
    dispatcher.dispatch({
      payload: node,
      type: 'lens-node:delete' 
    });
  },
  save: function(lens){
    dispatcher.dispatch({
      payload: lens,
      type: 'lens-composer:save' 
    });
  }
};

