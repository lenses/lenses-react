var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  getCustomOptions: function(){
    return {
      'title': 'text',
      'width': 'number',
      'height': 'number'
    }
  },
  getInitialState: function() {
    return {
      'title' : 'Hello',
      'width' : 600,
      'height': 400
    }
  },
  drawChart: function() {
      var dt         = new window.google.visualization.DataTable(),
          dataSchema = this.props.dataSchema,
          data       = this.props.data,
          options    = this.state,
          chart      = new window.google.visualization.LineChart(document.getElementById('chart-div'));

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

