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
      'numOfLines' : {
        name: 'Number of Lines',
        type: 'number'
      },
      'line1' : {
        name: 'Line 1',
        type: 'column'
      },
      'color1': {
        name: 'Line 1 Color',
        type: 'color'
      },
      'line2' : {
        name: 'Line 2',
        type: 'column'
      },
      'color2': {
        name: 'Line 2 Color',
        type: 'color'
      },
      'line3' : {
        name: 'Line 3',
        type: 'column'
      },
      'color3': {
        name: 'Line 3 Color',
        type: 'color'
      },
      'line4' : {
        name: 'Line 4',
        type: 'column'
      },
      'color4': {
        name: 'Line 4 Color',
        type: 'color'
      },
      'line5' : {
        name: 'Line 5',
        type: 'column'
      },
      'color5': {
        name: 'Line 5 Color',
        type: 'color'
      },
      'line6' : {
        name: 'Line 6',
        type: 'column'
      },
      'color6': {
        name: 'Line 6 Color',
        type: 'color'
      },
      'line7' : {
        name: 'Line 7',
        type: 'column'
      },
      'color7': {
        name: 'Line 7 Color',
        type: 'color'
      },
      'xAxisTitle': {
        name: 'X-Axis Title',
        type: 'text'
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
      'xAxisTicks': {
        name: 'X-Axis Ticks',
        type: 'text'
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
      'xAxisGridlinesCount': {
        name: 'X Axis Gridlines Number',
        type: 'number'
      },
      'yAxisGridlinesCount': {
        name: 'Y Axis Gridlines Number',
        type: 'number'
      }
    }
  },
  getInitialState: function() {
    return {
      'title': 'Enter Title',
      'width': 600,
      'height': 400,
      'numOfLines': 1,
      'xAxis': 0,
      'line1': 1,
      'color1': '#0000ff',
      'line2': 0,
      'color2': '#0000ff',
      'line3': 0,
      'color3': '#0000ff',
      'line4': 1,
      'color4': '#0000ff',
      'line5': 0,
      'color5': '#0000ff',
      'line6': 0,
      'color6': '#0000ff',
      'line7': 0,
      'color7': '#0000ff',
      'xAxisTicks': '',
      'xAxisGridlinesCount': '5',
      'yAxisGridlinesCount': '5',
      'xAxisTitle': 'x-axis',
      'yAxisTitleSize': '12',
      'yAxisTitle': 'y-axis',
      'xAxisTitleSize': '12',
      'xAxisFontSize': '12',
      'yAxisFontSize': '12',
      'vAxisScale': 'linear',
      'vAxisNumberFormat' : 'decimal',
      'legend': 'none'
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
            if(/^line.*/.test(key)) {
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

      options.colors = [options.color1, options.color2, options.color3, options.color4, options.color5, options.color6, options.color7];
      options['hAxis'] = {};
      options['hAxis']['titleTextStyle'] = {};
      options['hAxis']['textStyle'] = {};
      options['hAxis']['gridlines'] = {};
      options['hAxis']['title'] = options.xAxisTitle;
      options['hAxis']['titleTextStyle']['fontSize'] = options.xAxisTitleSize;
      options['hAxis']['textStyle']['fontSize'] = options.xAxisFontSize;
      options['hAxis']['ticks'] = options.xAxisTicks;
      options['hAxis']['gridlines']['count'] = options.xAxisGridlinesCount;
      
      options['vAxis'] =  {};
      options['vAxis']['titleTextStyle'] = {};
      options['vAxis']['textStyle'] = {};
      options['vAxis']['viewWindow'] = {};
      options['vAxis']['gridlines'] = {};
      options['vAxis']['title'] =  options.yAxisTitle;
      options['vAxis']['format'] = options.vAxisNumberFormat;
      options['vAxis']['titleTextStyle']['fontSize'] = options.yAxisTitleSize;
      options['hAxis']['textStyle']['fontSize'] = options.yAxisFontSize;
      options['vAxis']['scaleType'] = options.vAxisScale;
      options['vAxis']['gridlines']['count'] = options.yAxisGridlinesCount;
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

