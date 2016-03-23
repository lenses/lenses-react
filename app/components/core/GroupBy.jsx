var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      groupColumnValue: 'null',
      groupByColumnValue: 'null',
      aggFunction: 'null'
    };
  },
  handleChangeAggFunction: function(e) {
    var aggFunctionType = e.target.value
     ,  newDataSchema = this.props.dataSchema.slice(0)
     ,  state = this.state;

    if(this.state.groupColumnValue == null || this.state.groupByColumnValue == null) {
      alert('select a column first');
      return
    }

    this.setState({aggFunction: aggFunctionType});

    if(newDataSchema[newDataSchema.length - 1][1].startsWith('GroupedBy')) {
      newDataSchema.pop();
    }
    newDataSchema.push(['number', 'Grouped By ' + newDataSchema[this.state.groupByColumnValue][1]]);

    this.props.updateTransformFunction(() => {
      return this.groupRowsByColumnWithFunction(state.groupColumnValue, state.groupByColumnValue, aggFunctionType, this.props.data);
    }, newDataSchema);
  },
  groupRowsByColumnWithFunction(groupColumnValue, groupByColumnValue, aggFunction, data) {
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
          sum = sum + arr[n+1][groupByColumnValue];
        } else {
          if (aggFunction == 'average') {
            row.push((sum !== null) ? sum/groupedRowCounter : row[groupByColumnValue]);
          } else if (aggFunction == 'sum') {
            row.push((sum !== null) ? sum : row[groupByColumnValue]);
          }
          groupedData.push(row);
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

    selectedColumnName += 'Value';
    state[selectedColumnName] = selectedColumnValue;

    this.setState(state);
  },
  render: function() {
    // Column options into a variable
    //
    var columns = this.props.dataSchema.map((column, n) => {
      return <option key={n} value={n}>{column[1]}</option>
    });

    return (
      <div id='transform-div'>
        Group:
        <select name='groupColumn' value={this.state.groupColumnValue} onChange={this.handleChangeColumn}>
          <option disabled value>
            --select a column
          </option>
          {columns}
        </select>
        By:
        <select name='groupByColumn' value={this.state.groupByColumnValue} onChange={this.handleChangeColumn}>
          <option disabled value>
            --select a column
          </option>
          {columns}
        </select>
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
    )
  }
});

