var React = require('react');
var tabletop = require('tabletop');

var GoogleSheet = React.createClass({
  getInitialState: function() {
    return {
      value: "",
      data: [],
      columns: [],
      tbInstance: null
    }
  },
  handleInputChange: function(e) {
    this.setState({
      value: e.target.value
    });
  },
  handleKeyDown: function (e) {
    if (e.keyCode == 13) {
      this.getGoogleSheetData();
    }
  },
  getGoogleSheetData: function() {
    tabletop.init({
      key: this.state.value,
      callback: this.processData,
      simpleSheet: true,
      parseNumbers: true
    })
  },
  processData: function(data, tbInstance) {
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
      columns: columns,
      tbInstance: tbInstance
    });
    this.props.updateData(this.state.columns, this.state.data);
  },
  componentDidMount: function() {
    // This is the method to load external dependencies when the component mounts
    // React automagically bind this to method calls on the component so you can use
    // this safely in callback functions to refer to component methods
    // $.getScript("https://www.google.com/jsapi").done(this.callbackMethod);
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
        </div>
        <div>Columns: {this.state.columns}</div>
        <div>Data: {this.state.data}</div>
      </div>
    )
  }
});

module.exports = GoogleSheet;
