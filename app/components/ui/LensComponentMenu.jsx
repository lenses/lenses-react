var React = require('react');
var LensOvalButton = require('./LensOvalButton');
var lensComponentModel = require('../../models/lensComponentModel.js');


var LensComponentMenu = React.createClass({
  getInitialState: function() {
    return {
      value: "",
      inputField: false
    }
  },
  handleInputChange: function(e) {
    this.setState({
      value: e.target.value
    })
  },
  handleKeyDown: function(e) {
    // on pressing enter add the component
    if (e.keyCode == 13)  {this.addCustomComponent(this.state.value);}
  },
  toggleInputFields: function() {
    if (this.state.inputField) {
      this.setState({inputField: false});
    } else {
      this.setState({inputField: true});
    }
  },
  addCustomComponent: function(componentName) {
    this.toggleInputFields();
    this.props.addCustomComponent(componentName);
  },
  render: function() {
    var lensComponents = [];
    var inputFields = [];

    if(this.props.lensComponentLibrary) {
      this.props.lensComponentLibrary.forEach(function(component, id) {
        lensComponents.push(<LensOvalButton key={id}
          backgroundColor='#E0E0E0'
          content={component.name}
          actionPayload={new lensComponentModel(component.type)}
          border='none'
          action={this.props.addComponent}
          margin='5px'/>);
      }, this);
    }

    if(this.state.inputField) {
      // Abstract this into input field
      inputFields = [];
      inputFields.push(<input id='add-component-value'
        type='text'
        value={this.state.value}
        placeholder="ENTER URL"
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        />);
      inputFields.push( <LensOvalButton key='submit-new-component'
        margin='5px'
        action={this.addCustomComponent}
        actionPayload={this.state.value}
        content='DONE' />)
      inputFields.push( <LensOvalButton key='cancel-new-component'
        margin='5px'
        action={this.toggleInputFields}
        actionPayload={null}
        content='CANCEL' />)
    } else {
      inputFields = [];
      inputFields.push(<LensOvalButton key='add-new-component'
        margin='5px'
        action={this.toggleInputFields}
        actionPayload={null}
        content='ADD NEW COMPONENT' />)
    }

    return (
      <div className='lens-component-menu'>
        {lensComponents}
        {inputFields}
      </div>
    )
  }
});

module.exports = LensComponentMenu;
