var React          = require('react');

module.exports = React.createClass({
  componentDidMount: function() {
    var dataSchema = [['string', 'Topping'] , ['number' , 'Slices']];
    var testData = function() {
      return function(){
        return [['Goats', 5], ['Burrito',3], ['Olives', 1], ['Zucchini', 1], ['Pepperoni',2]];
      }
    }
    this.props.updateTransformFunction(testData(), dataSchema);
  },
  render: function() {
    return (
      <div className='test-data'>
        <div>Test Data Injected</div>
      </div>
    )
  }
});

