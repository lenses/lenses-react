var React = require('react');
// var $ = require('jquery');

module.exports = React.createClass({
  // this.props.data [[], []] row => data1, data2, data3
  // E.g. [[1,2,3] , [4,5,6]]
  // this.props.columns [[], []] type, column_name call it schema
  // ['string', 'name'] , ['number' , 'age']
  getInitialState: function() {
    // return an object of name value pairs where each name is a configurable variable
    // that you have set up in getCustomOptions and each value is the initial value for that variable.
    // E.g. {
    // 'title'  : 'Yabadabadoo',
    // 'width'  : 600,
    // 'height' : 400
    // };
  },
  getCustomOptions: function() {
    return {
      // return an object of configurable variables in your component
      // the name is the name of your variable and the value is the type
      // types allowed are the same as <input> types
      // e.g. {
      // 'title' : 'text',
      // 'width' : 'number',
      // 'height': 'number',
      // }
    }
  },
  customMethod: function() {
    // Do your drawing or data manipulations in any method that you define in this
    // object.
    // If your component returns manipulated data then make sure to call
    // this.props.updateTransformFunction(your_transform_function_here)
    // the transform function should not contain any async calls. If you need to make async calls
  },
  componentDidUpdate: function() {
    // If you are creating a drawing component make sure to call your drawing function here
    // so that it updates if custom options in the state have been updated
    // make sure to check for any dependencies that need to be loaded in the global namespace first.
    // E.g. if(window.google) {}; if you had loaded google's viz library
  },
  componentDidMount: function() {
    // This is the method to load external dependencies when the component mounts
    // React automagically bind this to method calls on the component so you can use
    // this safely in callback functions to refer to component methods
    // $.getScript("https://www.google.com/jsapi").done(this.callbackMethod);
  },
  render: function() {
    return (
      <div id='test-component'>
      </div>
    )
  }
});

