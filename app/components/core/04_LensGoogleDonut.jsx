var React = require('react');

var LensGoogleDonut = React.createClass({
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
      var options = {'title':'DONUT: How Much Pizza I Ate Last Night',
        'width':600,
        'height':400,
        'pieHole': 0.5
      };


      // Instantiate and draw our chart, passing in some options.
      var chart = new window.google.visualization.PieChart(document.getElementById('chart-div'));
      chart.draw(dt, options);
  },
  componentDidMount: function() {
    // Inject google viz jsapi
    // This is the method to load external dependencies when the component mounts
    var script = document.createElement('script');
    script.type="text/javascript";
    var drawChart = this.drawChart;
    script.onload = (function() {
      window.google.load('visualization', '1.0',
                         {packages:['corechart'],
                           callback:drawChart
                         });
    });
    (document.getElementsByTagName( "head" )[ 0 ]).appendChild( script );
    script.src="https://www.google.com/jsapi";
  },
  render: function() {
    return (
      <div id='chart-div'>
      </div>
    )
  }
});

module.exports = LensGoogleDonut;
