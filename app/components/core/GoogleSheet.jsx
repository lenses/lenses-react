var React          = require('react'),
    tabletop       = require('tabletop'),
    LensOvalButton = require('../ui/LensOvalButton.jsx'),
    url            = require('url');

module.exports = React.createClass({
  statics: {
    getMetadata: function() {
      return {
        type: 'data'
      }
    }
  },
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
      key: this.getKeyFromInput(key),
      callback: this.processData,
      simpleSheet: true,
      parseNumbers: true
    })
  },
  getKeyFromInput: function(key) {
    // Try to get from full url otherwise try to use the key as is
    // typical format https://docs.google.com/spreadsheets/d/2WbmbAW5Gruj_anSgweXOKEO0H6iNF2M0NTimom_jRh8/edit#gid=0 
    // return what's between /d/ and /edit/.*
    return url.parse(key).path.match(/(\/d\/)(.*)(\/)/)[2] || key;
  },
  processData: function(data) {
    //Transform into array of arrays
    var dataSchema         = [],
        transformedData = [],
        x               = 0;

    for(x = 0; x < data.length; x++) {
      var tempColumnData = [],
          column         = null;

      for (column in data[x]) {
        if(dataSchema.indexOf(column) == -1){
          dataSchema.push(column);
        }
        tempColumnData.push(data[x][column]);
      }
      transformedData.push(tempColumnData);
    }
    dataSchema = dataSchema.map(function(column){
      return [typeof data[0][column], column];
    });
    // At the end of processing data always call updateTransformFunction with a
    // closure that update dataSchema and returns the transformed data
    this.props.updateTransformFunction(transformedData, dataSchema);
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

    var linkStyle = {
      textDecoration: 'underline',
      color: 'blue'
    };

    return (
      <div className='google-sheet'>
        <div>
          Enter the url of a public google spreadsheet. 
        </div>
        <div style={{margin:20}}>
          <input className='google-sheet'
            type='text'
            value={this.state.value}
            placeholder="ENTER SHEET URL"
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
        <div style={linkStyle}>
          <a href='https://support.google.com/docs/answer/183965?hl=en'>Not sure how to make it public?</a> 
        </div>
      </div>
    )
  }
});

