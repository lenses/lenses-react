var React = require('react');
var LensOvalButton = require('./LensOvalButton.jsx');


var LensComponentMenu = React.createClass({
  render: function() {
    var lensComponents = [];

    this.props.lensComponents.forEach(function(component, id) {
      lensComponents.push(<LensOvalButton key={id}
                          backgroundColor='#E0E0E0'
                          content={component.name}
                          actionPayload={component}
                          border='none'
                          action={this.props.addComponent}
                          margin='5px'/>);
    }, this);
    return (
      <div className='lens-component-menu'>
        {lensComponents}
        <LensOvalButton key='add-new-component'
                        margin='5px'
                        content='ADD NEW COMPONENT' />
      </div>
           )
  }
});

module.exports = LensComponentMenu;
