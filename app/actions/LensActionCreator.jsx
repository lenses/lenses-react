var dispatcher = require('./../dispatcher.js');

// These actions are called from the components and communicate with the dispatcher
module.exports = {
  add: function(item){
    dispatcher.dispatch({
      payload: item,
      type: 'lens-node:add' 
    });
  },
  delete: function(item){
    dispatcher.dispatch({
      payload: item,
      type: 'lens-node:delete' 
    });
  }
};

