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
      'legend': {
        name: 'Legend',
        type: 'enum',
        options: ['none', 'right', 'left', 'top', 'bottom', 'in']
      },
      'categories': {
        name: 'Categories',
        type: 'column'
      },
      'values': {
        name: 'Values',
        type: 'column'
      }
    }
  },
  getInitialState: function() {
    return {
      'title': 'Enter Title',
      'width': 600,
      'height': 400,
      'legend': 'none',
      'categories' : 0,
      'values' : 1
    }
  },
  drawChart: function() {
    var dt         = new window.google.visualization.DataTable(),
        dataSchema = this.props.dataSchema,
        data       = this.props.data,
        options    = this.state,
        chart      = new window.google.visualization.PieChart(document.getElementById('chart-div'));

        if(data.length !== 0 && dataSchema.length !== 0) {
          var selectedColumns = [];
          // Filter Columns and Rows based on input
          selectedColumns.push(this.state.categories) ;
          selectedColumns.push(this.state.values) ;
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

