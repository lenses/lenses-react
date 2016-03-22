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
    var aggFunctionType = e.target.value;

    if(this.state.groupColumnValue == null || this.state.groupByColumnValue == null) {
      alert('select a column first');
      return
    }

    var newDataSchema = this.props.dataSchema.slice(0); 
    newDataSchema.push(['number', 'GroupedByResult']);

    var state = this.state;
    if(aggFunctionType == 'average') {
      this.props.updateTransformFunction(() => {
        var sortedData = this.props.data.sort((row, nextRow) => {
          var el = row[state.groupColumnValue],
            nextEl = nextRow[state.groupColumnValue];

            if(el < nextEl) {
              return -1;
            } else if (el > nextEl) {
              return 1;
            } else {
              return 0;
            }
        });


        var rowCounter = 0;
        var groupedRowCounter = 1;
        var groupedData = [];

        sortedData.forEach((row, n, arr) => {
          if(n < arr.length-1) {
            var el = arr[n+1][state.groupColumnValue]
          , nextEl = row[state.groupColumnValue];

            var avg=row[state.groupByColumnValue];
          if(el == nextEl) {
            avg = avg + arr[n+1][state.groupByColumnValue] / groupedRowCounter;
          } else {
            groupedRowCounter = 1;
            row.push(avg)
            groupedData.push(row);
            rowCounter++;
          }
          }
        });

        return groupedData;

      }, newDataSchema);

    } else if (aggFunctionType == 'sum') {
    }
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
      return <option value={n}>{column[1]}</option>
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

