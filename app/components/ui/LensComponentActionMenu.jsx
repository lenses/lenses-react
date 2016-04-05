var React = require('react');
var LensOvalButton = require('./LensOvalButton');


var LensComponentActionMenu = React.createClass({
  deleteComponent: function() {
    this.props.deleteComponent(this.props.currentSelectedNode);
  },
  render: function() {

    return (
      <div className='lens-component-menu'>
        <LensOvalButton key='delete-component'
          margin='5px'
          action={this.deleteComponent}
          content='DELETE COMPONENT' />
    </div>
    )}
});

module.exports = LensComponentActionMenu;
