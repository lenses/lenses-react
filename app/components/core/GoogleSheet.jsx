var React = require('react');
var tabletop = require('tabletop');
var LensOvalButton = require('../ui/LensOvalButton.jsx');

var GoogleSheet = React.createClass({
  getInitialState: function() {
    return {
      value: ""
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
    var columns = [], transformedData = [];
    for(var x = 0; x < data.length; x++) {
      var tempColumnData = [];
      for (var column in data[x]) {
        if(columns.indexOf(column) == -1){
          columns.push(column);
        }
        tempColumnData.push(data[x][column]);
      }
      transformedData.push(tempColumnData);
    }
    columns = columns.map(function(column){
      return [typeof data[0][column], column];
    });
    // At the end of processing data always call updateTransformFunction with a
    // closure that update columns and returns the transformed data
    this.props.updateTransformFunction(this.transformData(columns, transformedData));
  },
  transformData: function(columns, data) {
    // Make any updates to columns here and pass on data transform function
    // Use a closure to transfer data
    // What happens if this is a very large set of data
    this.props.updateColumns(columns);
    return function() {
      return data;
    }
  },
  render: function() {
    // Styling for non UI components is inline
    var inputStyle = {
      border:'none',
      background:'transparent',
      outline:'none',
      display:'inline-block',
      height:'35px',
      width:'250px',
      verticalAlign:'top',
      borderBottom:'1px solid #E1E1E1'
    };
    return (
      <div className='google-sheet'>
        Enter the ID of a published Google Spreadsheet
        <div>
        </div>
        <div style={{margin:20}}>
          <input className='google-sheet'
            type='text'
            value={this.state.value}
            placeholder="ENTER SHEET ID"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            style={inputStyle}
          />
          <LensOvalButton key='submit-new-component'
            margin='0px 0px 0px 10px'
            action={this.getGoogleSheetData}
            actionPayload={this.state.value}
            content='GET DATA' />
        </div>
        <div><a href='#'>Need Help?</a></div>
      </div>
    )
  }
});

module.exports = GoogleSheet;
