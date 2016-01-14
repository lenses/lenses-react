var React = require('react');

var ComponentTemplate = React.createClass({

  drawChart: function() {
    this.props.data;
    this.props.columns;
  },

//comp is rendered on the page
//this is where you can call external libs that need access to the DOM
  componentDidMount: function() {
  // var script = document.createElement('script');
  // script.type = 'text/javascript';
  // script.onload = function() {

  // };
  // script.src = 'http://whatever';

  // <script type='text' src onload=>
  },
  render: function() {
   
    var hello = 'Hello world';

    return (
      <div className='myLens'>
        <StoryHeader />
        <Txt1 />
     </div>
    )
  }
});

var StoryHeader = React.createClass({
  render: function() {
    return (
      <h1 className='storyHeader'>
        Potential Contributing Factors to 50lb Weight Gain
      </h1>
    );
  }
});

var Txt1 = React.createClass({
  render: function() {
    return (
      <p className='txt1'>
        You can describe your graphic can go here.
      </p>
    );
  }
});

/*
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
      </div>
    );
  }
});
*/

//Export your comp
//this allows you to require your component
module.exports = ComponentTemplate;

