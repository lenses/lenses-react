var React = require('react');

module.exports = React.createClass({
  statics: {
    getMetadata: function() {
      return {
        type: 'transform'
      }
    }
  },
  getCustomOptions: function(){
    return {
      'newColumnName': {
        name: 'New Column Name',
        type: 'text'
      }
    }
  },
  getInitialState: function() {
    return {
      groupColumnValue: 'null',
      aggregateColumnValue: 'null',
      aggFunction: 'null',
      newColumnName: 'Grouped Column'
    };
  },
  handleChangeAggFunction: function(e) {
    var aggFunctionType = e.target.value
      , funcName = 'groupRowsByColumnWithFunction'
      , funcParams = [this.state.groupColumnValue, this.state.aggregateColumnValue, aggFunctionType]
      , newDataSchema = [];

    if(this.state.groupColumnValue == null || this.state.aggregateColumnValue == null) {
      alert('select a column first');
      return
    }

    this.setState({aggFunction: aggFunctionType});

    newDataSchema.push(this.props.dataSchema[this.state.groupColumnValue]);
    newDataSchema.push(['number', this.state.newColumnName]);

    this.props.updateTransformFunction(() => {
      return {
        funcName: funcName,
        funcParams: funcParams
      }
    }, newDataSchema);
  },
  groupRowsByColumnWithFunction(groupColumnValue, aggregateColumnValue, aggFunction, data) {
    var rowCounter = 0
    , groupedRowCounter = 0
    , groupedData = []
    , sortedData
    , sum = null;

  // Sort the data lexically so we can group it easily
    sortedData = data.sort((row, nextRow) => {
      var el = row[groupColumnValue]
        , nextEl = nextRow[groupColumnValue];

      if(el < nextEl) {
        return -1;
      } else if (el > nextEl) {
        return 1;
      } else {
        return 0;
      }
    });

    // Group the data if the next el is the same as the current el
    // otherwise add as a new el.
    sortedData.forEach((row, n, arr) => {
      if(n < arr.length-1) {
        var el = arr[n+1][groupColumnValue]
          , nextEl = row[groupColumnValue];

        if(el == nextEl) {
          groupedRowCounter++;
          sum = sum + arr[n+1][aggregateColumnValue];
        } else {
          if (aggFunction == 'average') {
            row.push((sum !== null) ? sum/groupedRowCounter : row[aggregateColumnValue]);
          } else if (aggFunction == 'sum') {
            row.push((sum !== null) ? sum : row[aggregateColumnValue]);
          }
          // groupedData.push(row);
          groupedData.push([row[groupColumnValue], row[row.length-1]])
          sum = null;
          groupedRowCounter = 0;
          rowCounter++;
        }
      }
    });

    return groupedData;
  },
  handleChangeColumn: function(e) {
    var state = {}
      , selectedColumnName = e.target.name
      , selectedColumnValue = e.target.value;

    state[selectedColumnName] = selectedColumnValue;

    this.setState(state);
  },
  render: function() {
    // Column options into a variable
    //
    var columns = this.props.dataSchema.map((column, n) => {
      return <option key={n} value={n}>{column[1]}</option>
    });

    var instructionsStyle = {
      marginBottom: '20px'
    };
    return (
      <div id='transform-div'>
        <div style={instructionsStyle}>
          This component groups a column's values
          by another column using one of the available functions.
          It creates a new column. You can set the name of the new column
          that is created in the right hand options inspection window.
        </div>
        <div>
          Group By:
          <select name='groupColumnValue' value={this.state.groupColumnValue} onChange={this.handleChangeColumn}>
            <option disabled value>
              --select a column
            </option>
            {columns}
          </select>
        </div>
        <div>
          Aggregate Column:
          <select name='aggregateColumnValue' value={this.state.aggregateColumnValue} onChange={this.handleChangeColumn}>
            <option disabled value>
              --select a column
            </option>
            {columns}
          </select>
        </div>
        <div>
          Using Function:
          <select name='aggregateFunction' value={this.state.aggFunction} onChange={this.handleChangeAggFunction}>
            <option disabled value>
              --select a function
            </option>
            <option value='average'>
              average
            </option>
            <option value='sum'>
              sum
            </option>
          </select>
        </div>
      </div>
    )
  }
});

