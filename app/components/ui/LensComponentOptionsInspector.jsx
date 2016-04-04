var React          = require('react')
  ,  LensInputField = require('./LensInputField.jsx');

var LensComponentOptionsInspector = React.createClass({
  render: function() {
    var currentComponentCustomOptions = this.props.customInputOptions
      , inputComponents = [];

    if(this.props.dataSchema.length != 0) {
      this.props.dataSchema.forEach(function(column) {
        inputComponents.push(<LensInputField name={column[1]}
          key={column[1]}
          inputType='columnType'
          action={this.handleSchemaChange}
          initialValue={column[0]}/>);
      }, this);
    }

    for(var option in currentComponentCustomOptions) {
      var optionObject = currentComponentCustomOptions[option];
      var inputComponent;
      if(currentComponentCustomOptions.hasOwnProperty(option) && optionObject.configurable){
        if(optionObject['configurable'] == 'column') {
          inputComponent = (<LensInputField inputType ='enum'
            initialValue = {optionObject['value']}
            name         = {option}
            key          = {option}
            possibleValues = {this.props.dataSchema.map((schema) => { return schema[1] })}
            action       = {this.props.updateStateBasedOnCustomValues}/>)
        } else {
          inputComponent = (<LensInputField inputType = {optionObject['configurable']}
            initialValue = {optionObject['value']}
            name         = {option}
            key          = {option}
            action       = {this.props.updateStateBasedOnCustomValues}/>)
        }
        inputComponents.push(inputComponent);
      }
    }


    return (
      <div className='lens-component-custom-inputs'>
        {inputComponents}
      </div>
    )
  }
});

module.exports = LensComponentOptionsInspector;
