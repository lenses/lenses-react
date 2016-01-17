var React = require('react');
var $ = require('jquery');

module.exports = React.createClass({
  getCustomOptions: function(){
    return {
      //'title': 'text',
      'width': 'number',
      'height': 'number'
    }
  },
  getInitialState: function() {
    return {
      //GLOBAL STYLES
      //'title' : 'Testing',
      'width' : '900',
      'height': '400',
      'orientation': 'horizontal', 
      //fontSize: '',
      //fontName: 'Roboto', 
      'backgroundColor': 'white',

      // ANIMATION
        'animation':{
          'startup': true,
          'duration': 1000,
          'easing': 'out'
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
    // Inject google viz jsapi
    // This is the method to load external dependencies when the component mounts
    // React automagically binds this to method calls on the component so you can use
    // this safely in callback functions to refer to component methods
    $.getScript("https://www.google.com/jsapi").done(this.loadGoogleViz);
  },
  render: function() {

    //STYLES

    var container = {
      'width': '95%',
      'margin': '0 auto',
      'border': '0px solid pink'
    };

    var h1 = {
      'fontSize': '2em',
      'fontWeight': 400,
      'textAlign': 'left',
      'lineHeight': '2em',
      'border': '0px solid pink'
    };

    var h2 = {
      'fontSize': '1.25em',
      'fontWeight': 400,
      'textAlign': 'left',
      'lineHeight': '1.5em',
      'border': '0px solid yellow'
    };

    var textbox = {
      'fontSize': '0.9em',
      'fontWeight': 400,
      'textAlign': 'left',
      'marginTop': '10',
      'marginBottom': '50',
      'border': '0px solid pink'
    };

    var bold = {
      'fontWeight': '800'
    }

    var citation = {
      'fontSize': '0.7em',
      'fontWeight': 400,
      'textAlign': 'left',
      'marginTop': '50',
      'marginBottom': '75'
    };

    // ELEMENTS
    var citationTxt = '"United States. Census Bureau. Population Division. "Table 2-32: New York: Total Voting-Age Population and Citizen Voting-Age Population by Sex, for Counties: 2000." United States Census 2000. Washington: US Census Bureau, 4 Mar. 2004. Web. 12 Aug. 2009.  URL: http://www.census.gov/population/www/cen2000/briefs/phc-t31/tables/tab02-32.pdf.';

    return (
      <div id="container" style={container}>
        <h1 style={h1}>Fig 1.0: Title of Figure</h1>
        <h2 style={h2}>Subtitle: Exactly units are being compared here.</h2>
        <p style={textbox}>You can explain your graph in this text box.</p> 
        <div id='chart-div'></div>
        <p style={citation}><span style={bold}>Data Citation: </span>{citationTxt}</p>
      </div>
    )
  }
});

