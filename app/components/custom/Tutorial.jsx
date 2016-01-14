/* ======================================
IMPORT DEPENDANCIES: NODE MODULES & CHILD COMPONENTS
   import with 'require('fileName');'
*/

//Node Libs (if needed)
var React = require('react');

//Add Child Components (if needed)


/* ======================================
NOTES ABOUT <YourComp> 
  - please create a file called [YourComponentGoesHere]README.md to accompany your component in apps > components > custom
  - notes about your comp should go in its README file 
*/

/* ======================================
COMPONENT CLASS: */

  /* NAMING
  The name of your component (and all custom react class names):
  - must begin with an uppercase letter
  - should be descriptive and in camelCase for the rest of the title
  - The name that you give your comp Class is the name that will show up in the menu bar when your component is added to the Lenses UI
  */

var Tutorial = React.createClass({

  /* NOTES:
    Your component is simply a js object.

    Data enters your component thru:
      this.props.columns;  //these are the headers
      this.props.data;      //rows of data
    
    Write helper fx here to be called at render.
*/

/* 
Pie Chart API: https://developers.google.com/chart/interactive/docs/gallery/piechart
Drawchart: callback fx that creates and populates a data table, 
instantiates the pie chart, 
passes in the data and draws it.
*/
//gCharts expects co1 = string
//data = 
/*
Data passed in from a parent component is available as a 'property' on the child component. These 'properties' are accessed through this.props. 
*/
  drawChart: function() {
      var dt = new window.google.visualization.DataTable(); //create the gViz data table
      var columns = this.props.columns; //import your headers
      var data = this.props.data; //import your data

      columns.forEach(function(column){ //add your headers to the dt
        var type = column[0];
        var name = column[1];
        dt.addColumn(type, name);
      })

      dt.addRows(data); //add your data to the dt


      // Set chart options
      var options = {'title': 'TUTORIAL',   //'How Much Pizza I Ate Last Night',
        'width':600,
        'height':400};


      // Instantiate and draw our chart, passing in some options.
      //ColumnChart
      var chart = new window.google.visualization.PieChart(document.getElementById('chart-div'));
      chart.draw(dt, options);
  },
  
  componentDidMount: function() {
    //This is where you should put your 
    //comp is rendered on the page
    //this is where you can call external libs that need access to the DOM
    // Inject google viz jsapi
    // This is the method to load external dependencies when the component mounts
    var script = document.createElement('script');
    script.type="text/javascript";
    script.src="https://www.google.com/jsapi";

    var drawChart = this.drawChart;
    script.onload = (function() {
      window.google.load('visualization', '1.0',
                         {packages:['corechart'],
                           callback:drawChart
                         });
    });
    (document.getElementsByTagName( "head" )[ 0 ]).appendChild( script );
    
  },

  /* RENDER NOTES ------------------------
    Render is a req'd method for all react components. 
    It returns a tree of html and/or jsx components that will render to the screen.

    Resources:
    - http://facebook.github.io/react/docs/jsx-in-depth.html 

  // you can write html here  
  //React turns your html into in JS functions when it iserts it into the DOM
  //link to react Docs

      - nest your JSX, just like you would w/ html
      - conditional elements: create a var for the conditional element in the code body. Then write the conditional element into your return statement. It will only exist in the return if the condition is met.
      - #? 'Where possible, I like to iterate over lists of data in-line in the returned JSX unless its internal logic is sufficiently complex enough to warrant moving outside of the return statement and populating an array for rendering.' 
  */


  render: function() {
    return (
      //pass all css as object
      //css selectors are also obj
      <div id='chart-div' style={}>
      </div>
    ) //end return
  } //END render
  
}); //END LensTutorial_GoogleBarGraph
/*
var storyHeader = React.createClass({
  render: function() {
    return (
      <h1 id='storyHeader'>
        Potential Contributing Factors to 50lbs Weight Gain 
      </h1>
    );
  }
});
*/

/* ======================================
EXPORTS 
  Your export is the var name of your component. */

module.exports = Tutorial;
