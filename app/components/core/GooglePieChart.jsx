var React = require('react');
var $ = require('jquery');

var LensGooglePieChart = React.createClass({
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
      var chart = new window.google.visualization.PieChart(document.getElementById('chart-div'));
      chart.draw(dt, options);
  },
  loadGoogleViz: function() {
    window.google.load('visualization', '1.0',
                       {packages:['corechart'],
                         callback:this.drawChart
                       });

  },
  componentDidMount: function() {
    $.getScript("https://www.google.com/jsapi").done(this.loadGoogleViz);
  },
  render: function() {
    return (
      <div id='chart-div'>
      </div>
    )
  }
});

module.exports = LensGooglePieChart;
