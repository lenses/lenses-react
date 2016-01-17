var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  getCustomOptions: function(){
    return {
      'title': 'text',
      'width': 'number',
      'height': 'number',
      'orientation': 'text',
      'animation duration': 'number',
      'animation easing': 'text',
      'backgroundColor': 'text',
      'curveType': 'text'
    }
  },

  getInitialState: function() {
    return {
      //GLOBAL STYLES
      'width' : '900',
      'height': '400',
      'orientation': 'horizontal', // 'horizontal' | 'vertical'
      'backgroundColor': 'white',  // hex or CSS name
      'title': 'Enter Title',

      // ANIMATION
        'animation':{
          'startup': true, // bool
          'duration': 1000, // num in ms
          'easing': 'out' // linear | in | out | inAndOut
        }, //END ani 

        // LINE
        'colors': ['#1ee2d9', '#ee4220', '#f7978f', '#3dc1c1'], // line color array
        'curveType': 'function' //values: none (straight lines) | 'function' (angles of the line will be smoothed)
    } //return
  }, //get init state

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
    $.getScript("https://www.google.com/jsapi").done(this.loadGoogleViz);
  },

  render: function() {

    return (
      <div id="container">
        <div id='chart-div'></div>
      </div>
    )
  }
});

