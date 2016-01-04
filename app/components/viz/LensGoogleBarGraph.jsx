var React = require('react');

var LensGoogleBarGraph = React.createClass({
  drawChart: function() {
      var data = new window.google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
      ]);

      // Set chart options
      var options = {'title':'How Much Pizza I Ate Last Night',
        'width':400,
        'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new window.google.visualization.PieChart(document.getElementById('chart-div'));
        chart.draw(data, options);
  },
  componentDidMount: function() {
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

module.exports = LensGoogleBarGraph;
