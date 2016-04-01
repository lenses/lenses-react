var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  statics: {
    getMetadata: function() {
      return {
        type: 'viz'
      }
    }
  },
  getCustomOptions: function(){
    return {
      'title': 'text',
      'width': 'number',
      'height': 'number',
      'legend': 'text',
      'numOfLines': 'number',
      'color': 'color',
      'xAxis': 'column',
      'Line 1': 'column',
      'Line 2': 'column',
      'Line 3': 'column',
      'Line 4': 'column',
      'Line 5': 'column',
      'Line 6': 'column'
    }
  },
  getInitialState: function() {
    return {
      'title': 'Enter Title',
      'width': 600,
      'height': 400,
      'legend': 'right',
      'numOfLines': 1,
      'color': '#0000ff',
      'xAxis': 0,
      'Line 1': 0,
      'Line 2': 0,
      'Line 3': 0,
      'Line 4': 0,
      'Line 5': 0,
      'Line 6': 0
    };
  },
  drawChart: function() {
    var dt         = new window.google.visualization.DataTable(),
        dataSchema = this.props.dataSchema,
        data       = this.props.data,
        options    = this.state,
        chart      = new window.google.visualization.LineChart(document.getElementById('chart-div'));

        if(data.length !== 0 && dataSchema.length !== 0) {
          var selectedColumns = [];
          // Filter Columns and Rows based on input
          selectedColumns.push(this.state.xAxis);
          for(var key in options) {
            if(/^Line.*/.test(key)) {
              selectedColumns.push(options[key]);
            }
          }
          selectedColumns = selectedColumns.slice(0, this.state.numOfLines+1);
          selectedColumns.forEach(function(column){
            dt.addColumn(this.props.dataSchema[column][0], this.props.dataSchema[column][1]);
          }.bind(this));
          dt.addRows(this.props.data.map(function(row){
            var filteredRow = [];
            selectedColumns.forEach(function(column) {
              filteredRow.push(row[column]);
            })
            return filteredRow;
          }));
        }

        options.colors = [options.color];
        // Instantiate and draw our chart, passing in some options.
        chart.draw(dt, options);
  },
  loadGoogleViz: function() {
        window.google.load('visualization', '1.0',
                           {packages:['corechart'],
                             callback:this.drawChart
                           });

  },
  componentDidUpdate: function() {
        if(window.google){
          this.drawChart();
        }
  },
  componentDidMount: function() {
        // Inject google viz jsapi
        // This is the method to load external dependencies when the component mounts
        // React automagically binds this to method calls on the component so you can use
        // this safely in callback functions to refer to component methods
        $.getScript("https://www.google.com/jsapi").done(this.loadGoogleViz);
  },
  render: function() {
        return (
          <div id='chart-div'>
          </div>
        )
  }
});

