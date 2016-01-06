var React = require('react');
var LensOvalButton = require('./LensOvalButton.jsx');


var LensComponentActionMenu = React.createClass({
  render: function() {

    return (
      <div className='lens-component-menu'>
        <LensOvalButton key='customize-component'
                        margin='5px'
                        content='CUSTOMIZE COMPONENT' />
        <LensOvalButton key='delete-component'
                        margin='5px'
                        action={this.props.deleteComponent}
                        cmp={this.props.currentSelectedCmp}
                        content='DELETE COMPONENT' />
      </div>
           )
  }
});

module.exports = LensComponentActionMenu;
