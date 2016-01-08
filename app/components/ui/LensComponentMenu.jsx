var React = require('react');
var LensOvalButton = require('./LensOvalButton');


var LensComponentMenu = React.createClass({
  getInitialState: function() {
    return {
      value: "Enter Component Name"
    }
  },
  handleInputChange: function(e) {
    this.setState({
      value: e.target.value
    })
  },

  render: function() {
    var lensComponents = [];

    if(this.props.lensComponentLibrary) {
      this.props.lensComponentLibrary.forEach(function(component, id) {
        lensComponents.push(<LensOvalButton key={id}
          backgroundColor='#E0E0E0'
          content={component.name}
          actionPayload={component}
          border='none'
          action={this.props.addComponent}
          margin='5px'/>);
      }, this);
    }
    return (
      <div className='lens-component-menu'>
        {lensComponents}
        <LensOvalButton key='add-new-component'
                        margin='5px'
                        action={this.props.addCustomComponent}
                        actionPayload={this.state.value}
                        content='ADD NEW COMPONENT' />
        <input id='add-component-value' type='text' value={this.state.value} onChange={this.handleInputChange}/>
      </div>
           )
  }
});

module.exports = LensComponentMenu;
