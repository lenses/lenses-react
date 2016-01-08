var React = require('react');
var $ = require('jquery');

var CustomGoogleBar = React.createClass({
  drawChart: function() {
      var dt = new window.google.visualization.DataTable();
      var columns = this.props.columns;
      var data = this.props.data;

      columns.forEach(function(column){
        var type = column[0];
        var name = column[1];
        dt.addColumn(type, name);
      })

      dt.addRows(data);

      // Set chart options
      var options = {'title':'How Much Pizza I Ate Last Night',
        'width':600,
        'height':400};

      // Instantiate and draw our chart, passing in some options.
      var chart = new window.google.visualization.ColumnChart(document.getElementById('chart-div'));
      chart.draw(dt, options);
  },
  loadGoogleViz: function() {
    window.google.load('visualization', '1.0',
                       {packages:['corechart'],
                         callback:this.drawChart
                       });

  },
  componentDidMount: function() {
    // Inject google viz jsapi
    // This is the method to load external dependencies when the component mounts
    // React automagically bind this to method calls on the component so you can use 
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

module.exports = CustomGoogleBar;
