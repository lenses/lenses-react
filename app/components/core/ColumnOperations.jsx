var React = require('react');
var $ = require('jquery');
var _ = require('lodash');

module.exports = React.createClass({

  getInitialState: function() {
    return {}
  },

  getCustomOptions: function() {
    return {}
  },

  performOperation: function(column1Index, column2Index) {
    return function() {

      var dataCopy = _.cloneDeep(this.props.data);
      
      for (index in dataCopy) {
        datum = dataCopy[index];
        var result;
        switch(this.state.operator) {
          case '+':
            result = datum[column1Index] + datum[column2Index];
            break;
          case '-':
            result = datum[column1Index] - datum[column2Index];
            break;
          case '*':
            result = datum[column1Index] * datum[column2Index];
            break;
          case '/':
            result = datum[column1Index] / datum[column2Index];
        }
        datum.push(result);
      }
      return dataCopy;

    }.bind(this);
  },

  /* Check if the user-entered operator is in the list of supported operations.*/
  isValidOperator: function() {
    return ['+', '-', '*', '/'].indexOf(this.state.operator) >= 0
  },

  handleInputChanged: function(ev) {
    this.state[ev.target["id"]] = ev.target.value;
  },

  handleButtonClicked: function(ev) {
    if (!this.isValidOperator()) return;

    var schemaCopy = _.cloneDeep(this.props.dataSchema);
    
    var columnNames = schemaCopy.map(function(value, index) {return value[1]});
    var columnTypes = schemaCopy.map(function(value, index) {return value[0]});
    var column1Index = columnNames.indexOf(this.state.column1);
    var column2Index = columnNames.indexOf(this.state.column2);
    
    var newColumnIndex = columnNames.indexOf(this.state.newColumnName);

    if (column1Index != -1 && column2Index != -1 && newColumnIndex == -1) {
      if (columnTypes[column1Index] == 'string' && columnTypes[column2Index] == 'string' &&
          this.state.operator == '+') {
        schemaCopy.push(['string', this.state.newColumnName]);
      }
      else if (columnTypes[column1Index] == 'number' && columnTypes[column2Index] == 'number') {
        schemaCopy.push(['number', this.state.newColumnName]);
      }
      else {
        return;
      }
      this.props.updateTransformFunction(this.performOperation(column1Index, column2Index),
                                         schemaCopy);
    }
  },

  render: function() {
    return (
      <div id='column-operations'>
        <label >Column 1: </label>
        <input id="column1" type="text" onChange={this.handleInputChanged} value={this.state.column1}/><br/>
        <label >Operator: </label>
        <input id="operator" type="text" onChange={this.handleInputChanged} value={this.state.operator}/><br/>
        <label >Column 2: </label>
        <input id="column2" type="text" onChange={this.handleInputChanged} value={this.state.column2}/><br/>
        <label >New Column: </label>
        <input id="newColumnName" type="text" onChange={this.handleInputChanged} value={this.state.newColumnName}/><br/>
        <button id="buttonPerform" onClick={this.handleButtonClicked}>Do It!</button>
      </div>
    )
  }
});
