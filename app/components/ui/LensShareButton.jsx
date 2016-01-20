var React = require('react');


var LensShareButton = React.createClass({

  save: function() {
    this.props.saveHelper(this.props.tracks);
  },
  render: function() {
    return (
      <div className='lens-share-button-wrapper'>
        <div onClick={this.save} className='lens-share-button'>
          Publish
        </div>
      </div>
           )
  }
});

module.exports = LensShareButton;
