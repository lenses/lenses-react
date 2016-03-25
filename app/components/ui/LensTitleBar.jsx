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
      lensPublishedLinks,
      lensEmbedUrl;

      if(this.props.id) {
        var width = this.props.tracks[0][this.props.tracks[0].length-1].customInputOptions.width.value  || '600';
        var height = this.props.tracks[0][this.props.tracks[0].length-1].customInputOptions.height.value  + 100 || '400';
        lensUrl = 'http://' + window.location.host + '/lenses/' + this.props.id;
        lensEmbedUrl = '<iframe src='+lensUrl+' frameborder="0" width=' + width + ' height=' + height + ' />'; 
        lensPublishedLinks =
        <div id='lens-published-links'>
          <div>View: <a href={lensUrl} target='_blank'>{lensUrl}</a></div>
          <div>Embed: {lensEmbedUrl}</div>
        </div>;
      }
      
    return (
      <div id='lens-title-bar' >
        <img className='title-bar-logo' src='/public/images/lenses-logo.png' alt='Lenses Owl Logo' />
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
        {lensPublishedLinks}
      </div>
    )
  }
});

