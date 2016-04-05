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
      'title': {
        name: 'Title',
        type: 'text'
      },
      'width': {
        name: 'Width',
        type: 'number'
      },
      'height': {
        name: 'Height',
        type: 'number'
      },
      'xAxis': {
        name: 'X-Axis',
        type: 'column'
      },
      'xAxisTitle': {
        name: 'X-Axis Title',
        type: 'text'
      },
      'yAxis': {
        name: 'Y-Axis',
        type: 'column'
      },
      'yAxisTitle': {
        name: 'Y-Axis Title',
        type: 'text'
      },
      'yAxisTitleSize': {
        name: 'Y-Axis Title Font-Size',
        type: 'number'
      },
      'xAxisTitleSize': {
        name: 'X-Axis Title Font-Size',
        type: 'number'
      },
      'yAxisFontSize': {
        name: 'Y-Axis Label Font-Size',
        type: 'number'
      },
      'xAxisFontSize': {
        name: 'X-Axis Label Font-Size',
        type: 'number'
      },
      'legend': {
        name: 'Legend',
        type: 'enum',
        options: ['none', 'right', 'left', 'top', 'bottom', 'in']
      },
      'vAxisNumberFormat': {
        name: 'Y-Axis Number Format',
        type: 'enum',
        options: ['decimal', 'scientific', 'currency', 'percent', 'short', 'long']
      },
      'vAxisScale': {
        name: 'Y-Axis Scale',
        type: 'enum',
        options: ['linear', 'log']
      },
      'color': {
        name: 'Columns Color',
        type: 'color'
      }
    }
  },
  getInitialState: function() {
    return {
      'title': 'Enter Title',
      'width': 600,
      'height': 400,
      'xAxis': 0,
      'yAxis': 1,
      'xAxisTitle': 'x-axis',
      'yAxisTitle': 'y-axis',
      'xAxisFontSize': '12',
      'yAxisFontSize': '12',
      'xAxisTitleSize': '12',
      'yAxisTitleSize': '12',
      'vAxisScale': 'linear',
      'vAxisNumberFormat' : 'decimal',
      'legend': 'none',
      'color': '#0000ff'
    };
  },
  drawChart: function() {
    var dt         = new window.google.visualization.DataTable(),
        dataSchema = this.props.dataSchema,
        data       = this.props.data,
        options    = this.state,
        chart      = new window.google.visualization.ColumnChart(document.getElementById('chart-div'));

        if(data.length !== 0 && dataSchema.length !== 0) {
          var selectedColumns = [];
          // Filter Columns and Rows based on input
          selectedColumns.push(this.state.xAxis) ;
          selectedColumns.push(this.state.yAxis) ;
          selectedColumns.forEach(function(column){
            dt.addColumn(this.props.dataSchema[column][0], this.props.dataSchema[column][1]);
          }.bind(this));
          dt.addRows(this.props.data.map((row) => {
            var filteredRow = [];
            selectedColumns.forEach((column) => {
              filteredRow.push(row[column]);
            });
            return filteredRow;
          }));
        }

      options.colors = [options.color];
      options['hAxis'] = {};
      options['hAxis']['titleTextStyle'] = {};
      options['hAxis']['textStyle'] = {};
      options['hAxis']['title'] = options.xAxisTitle;
      options['hAxis']['titleTextStyle']['fontSize'] = options.xAxisTitleSize;
      options['hAxis']['textStyle']['fontSize'] = options.xAxisFontSize;
      
      options['vAxis'] =  {};
      options['vAxis']['titleTextStyle'] = {};
      options['vAxis']['textStyle'] = {};
      options['vAxis']['viewWindow'] = {};
      options['vAxis']['title'] =  options.yAxisTitle;
      options['vAxis']['format'] = options.vAxisNumberFormat;
      options['vAxis']['titleTextStyle']['fontSize'] = options.yAxisTitleSize;
      options['hAxis']['textStyle']['fontSize'] = options.yAxisFontSize;
      options['vAxis']['scaleType'] = options.vAxisScale;
      options['vAxis']['viewWindow']['min'] = 0;

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

