var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  getCustomOptions: function(){
    return {
      'backgroundColor': 'text',
      'datalessRegionColor': 'text',
      'defaultColor': 'text'
      'colorAxis1':'text'
      'colorAxis2':'text'
    }
  },
  getInitialState: function() {
    return {
      'backgroundColor': 'ffffff',
      'datalessRegionColor': 'ffffff',
      'defaultColor': 'ffffff'
      'colorAxis1':'ffffff'
      'colorAxis2':'ffffff'
    }
  },


  drawChart: function() {
      var dt         = new window.google.visualization.DataTable(),
          dataSchema = this.props.dataSchema,
          data       = this.props.data,
          // options    = this.state,
          chart      = new window.google.visualization.GeoChart(document.getElementById('chart-div'));

      var options = {
          colorAxis: {colors: ['blue', 'ff07f0', '#0770ff']},
          backgroundColor: this.state.
          datalessRegionColor: '#f5f5f5',
          defaultColor: '#f5f5f5'
      }

      dataSchema.forEach(function(column){
        var type = column[0],
            name = column[1];
        dt.addColumn(type, name);
      })

      dt.addRows(data);

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

