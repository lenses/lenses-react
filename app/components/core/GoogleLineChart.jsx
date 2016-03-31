var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  getCustomOptions: function(){
    return {
      'title': 'text',
      'width': 'number',
      'height': 'number',
      'legend': 'text'
    }
  },
  getInitialState: function() {
    return {
      'title': 'Enter Title',
      'width': 600,
      'height': 400,
      'columns': 'all',
      'legend': 'right'
    };
  },
  drawChart: function() {
    var dt         = new window.google.visualization.DataTable(),
        dataSchema = this.props.dataSchema,
        data       = this.props.data,
        options    = this.state,
        chart      = new window.google.visualization.LineChart(document.getElementById('chart-div'));

        if(data.length !== 0 && dataSchema.length !== 0) {
          var selectedColumns;
          if(this.props.selectedColumns.length == 0) {
          // Select all columns and rows
            selectedColumns = dataSchema;
          } else {
          // Filter Columns and Rows based on input
            selectedColumns = this.props.selectedColumns;
          }
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

