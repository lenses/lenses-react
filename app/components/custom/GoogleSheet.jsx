var React = require('react');
var $ = require('jquery');
var tabletop = require('tabletop');

var GoogleSheet = React.createClass({
  getInitialState: function() {
    return {
      value: ""
    }
  },
  handleInput: function() {
  },
  handleKeyDown: function () {
  },
  componentDidMount: function() {
    // This is the method to load external dependencies when the component mounts
    // React automagically bind this to method calls on the component so you can use
    // this safely in callback functions to refer to component methods
    // $.getScript("https://www.google.com/jsapi").done(this.callbackMethod);
    tabletop.init( { key: '0AmYzu_s7QHsmdDNZUzRlYldnWTZCLXdrMXlYQzVxSFE',
                  callback: function(data, tabletop) { console.log(data) },
                  simpleSheet: true } );
  },
  render: function() {
    return (
      <div class='google-sheet'>
        inputFields.push(<input class='google-sheet'
          type='text'
          value={this.state.value}
          placeholder="COMPONENT NAME"
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />);
      </div>
    )
  }
});

module.exports = GoogleSheet;
