var React = require('react');


module.exports = React.createClass({

  save: function() {
    this.props.save();
  },
  render: function() {
    var style = {};
    style['cursor'] = 'pointer';
    if(this.props.publishState.published) {
      style['backgroundColor'] = '#00db7c'
      style['color'] = white;
    }     
    var lensUrl = '/lenses/' + this.props.publishState.id + '/edit';
    return (
      <div className='lens-publish-button-wrapper' style={style}>
        <div onClick={this.save} className='lens-share-button'>
          {(this.props.publishState.published) ? <a href={lensUrl}>Published</a> : 'Publish'}
        </div>
      </div>
     )
  }
});

