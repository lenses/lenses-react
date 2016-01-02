var React = require('react');

var LensAddButton = React.createClass({
  render: function(){
    return (
      <div className='lens-add-button'>
        {this.props.content}
      </div>
    );
  }
});

module.exports = LensAddButton;
