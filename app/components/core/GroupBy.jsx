var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    // Column options into a variable
    //
    var columns = this.props.dataSchema.map((column) => {
      return <option value={column[1]}>{column[1]}</option>
    });
    console.log(this.props.dataSchema);
        return (
          <div id='transform-div'>
            Column:
            <select>
              {columns}
            </select>
            Function:
            <select name='aggregateFunction' value='average'>
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

