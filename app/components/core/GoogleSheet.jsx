var React = require('react');
var tabletop = require('tabletop');
var LensOvalButton = require('../ui/LensOvalButton.jsx');

var GoogleSheet = React.createClass({
  getInitialState: function() {
    return {
      value: "",
      data: [],
      columns: []
    }
  },
  handleInputChange: function(e) {
    this.setState({
      value: e.target.value
    });
  },
  handleKeyDown: function (e) {
    if (e.keyCode == 13) {
      this.getGoogleSheetData(this.state.value);
    }
  },
  getGoogleSheetData: function(key) {
    tabletop.init({
      key: key,
      callback: this.processData,
      simpleSheet: true,
      parseNumbers: true
    })
  },
  processData: function(data) {
    //Transform into array of arrays
    var columns = [], tempData = [];
    for(var x = 0; x < data.length; x++) {
      var tempColumnData = [];
      for (var column in data[x]) {
        if(columns.indexOf(column) == -1){
          columns.push(column);
        }
        tempColumnData.push(data[x][column]);
      }
      tempData.push(tempColumnData);
    }
    columns = columns.map(function(column){
      return [typeof data[0][column], column];
    });
    this.setState({
      data: tempData,
      columns: columns
    });
    this.props.updateColumns(columns);
    this.props.updateTransformFunction(this.transformData());
  },
  transformData: function() {
    // Use a closure to transfer data
    // What happens if this is a very large set of data
    var data = this.state.data;
    return function() {
      return data;
    }
  },
  render: function() {
    return (
      <div className='google-sheet'>
        Enter the ID of a published Google Spreadsheet
        <div>
          <a href='#'>Follow Instructions here</a>
        </div>
        <div>
          <input className='google-sheet'
            type='text'
            value={this.state.value}
            placeholder="ENTER SHEET ID"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />
          <LensOvalButton key='submit-new-component'
            margin='5px'
            action={this.getGoogleSheetData}
            actionPayload={this.state.value}
            content='GET DATA' />
        </div>
      </div>
    )
  }
});

module.exports = GoogleSheet;
