var React = require('react');

var LensTitleBar = React.createClass({
  getDefaultProps: function() {
    return {
      title: "LENSTITLE",
      author: "Author"
    };
  },
  render: function() {
    return (
      <div id='lens-title-bar' >
        <input id='lens-title' className='title-bar-input latoregular' type='text' name='lens-title' placeholder={this.props.title} />
        <input id='lens-author' className='title-bar-input latosemibolditalic' type='text' name='lens-author' placeholder={this.props.author} />
      </div>
    )
  }
});

module.exports = LensTitleBar;
