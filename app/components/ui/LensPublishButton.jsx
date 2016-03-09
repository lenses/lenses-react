var React = require('react');


module.exports = React.createClass({

  save: function() {
    if(!this.props.id) {
      this.props.save();
    } else {
      alert('already published :) create a new lens if you want to make changes');
    }
  },
  render: function() {
    var style = {};

    style['cursor'] = 'pointer';
    if(this.props.id) {
      style['backgroundColor'] = '#00db7c'
      style['color'] = 'white';
    }
    return (
      <div className='lens-publish-button' onClick={this.save} style={style}>
        {(this.props.id) ? 'Published' : 'Publish'}
      </div>
     )
  }
});

