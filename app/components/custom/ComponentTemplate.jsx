var React = require('react');
// var $ = require('jquery');

module.exports = React.createClass({
  // Lenses works with Tabular Data
  //
  // If the data looks like this:
  //
  // |   Pizza    | Quantity | Company  |
  // |------------|----------|----------|
  // | Pepperoni  |        5 | PizzaHut |
  // | Garlic     |        4 | Dominos  |
  // | Everything |        1 | PizzaHut |
  // | Garlic     |        5 | Dominos  |
  //
  //
  // You can access the data and the dataSchema in Lenses in the following way:
  //
  // this.props.dataSchema =
  // [
  //  ['string', 'Pizza'],
  //  ['number', 'Quantity'],
  //  ['string', 'Company']
  // ]
  //
  // The Data Schema is an arrary of arrays that represents the type of data in a column and the column header.
  // The input component determines how to parse the data to figure out the type of data in the column. It should
  // take a best guess but could be incorrect and should allow users to change that.
  //
  //
  // this.props.data =
  // [
  //  ['Pepperoni', 5, 'PizzaHut'],
  //  ['Garlic', 4, 'Dominos'],
  //  ['Everything', 1, 'PizzaHut'],
  //  ['Garlic', 5, 'Dominos'],
  // ]
  //
  // The Data is an array of arrays that represents each row of the tabular data and a value for each column.
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
    // this.props.updateTransformFunction(yourTransformFunction(), dataSchema)
  },
  yourTransformFunction: function() {
    // the transform function should not contain any async calls. If you need to make async calls
    // make them before hand and pass the result to this function
    // It should pass the data in a closure to be used later. i.e. you should return a function here that
    // returns your newly transformed or retrieved data
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

