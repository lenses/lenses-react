var React = require('react');
var LensOvalButton = require('./LensOvalButton');


var LensComponentActionMenu = React.createClass({
  render: function() {

    return (
      <div className='lens-component-menu'>
        <LensOvalButton key='delete-component'
                        margin='5px'
                        action={this.props.deleteComponent}
                        content='DELETE COMPONENT' />
      </div>
           )
  }
});

module.exports = LensComponentActionMenu;
