var React = require('react');


module.exports = React.createClass({

  save: function() {
    this.props.save();
  },
  render: function() {
    var style;
    if(this.props.publishState.published) {
      style = {
        backgroundColor: 'green'
      }
    } else {
      style = {
        backgroundColor: 'red'
      }
    }
    var lensUrl = '/lenses/' + this.props.publishState.id + '/edit';
    return (
      <div className='lens-share-button-wrapper' style={style}>
        <div onClick={this.save} className='lens-share-button'>
          {(this.props.publishState.published) ? <a href={lensUrl}>Published</a> : 'Publish'}
        </div>
      </div>
     )
  }
});

