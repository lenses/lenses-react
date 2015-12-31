var React = require('react');

var LensOvalButton = React.createClass({
  render: function(){
    return (
      <div className='lens-oval-button'>
        {this.props.content}
      </div>
    );
  }
});

module.exports = LensOvalButton;
