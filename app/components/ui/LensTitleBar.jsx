var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      title: this.props.title,
      author: this.props.author
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps) {
      this.setState({
        title: nextProps.title,
        author: nextProps.author
      });
    }
  },
  handlePropChange: function(e) {
    var state = {};
    state[e.target.name]=e.target.value;
    this.setState(state);
    this.props.updateTitleAndAuthor(state);
  },
  render: function() {
    var lensUrl,
      lensEmbedUrl;

      lensUrl = 'http://' + window.location.host + '/lenses/' + this.props.id;
      lensEmbedUrl = '<iframe src='+lensUrl+' frameborder="0" width=100% height=100% />'; 
    return (
      <div id='lens-title-bar' >
        <div id='lens-title-wrapper'>
          <input id='lens-title' className='title-bar-input latoregular'
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.handlePropChange}
            placeholder='LENSTITLE' />
          <input id='lens-author'
            className='title-bar-input latosemibolditalic'
            type='text'
            value={this.state.author}
            onChange={this.handlePropChange}
            name='author'
            placeholder='AUTHOR' />
        </div>
        <div id='lens-published-links'>
          <div>View: <a href={lensUrl}>{lensUrl}</a></div>
          <div>Embed: {lensEmbedUrl}</div>
        </div>
      </div>
    )
  }
});

