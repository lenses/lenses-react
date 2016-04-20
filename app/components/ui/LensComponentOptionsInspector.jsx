var React          = require('react')
  , LensInputField = require('./LensInputField.jsx');

var LensComponentOptionsInspector = React.createClass({
  handleSchemaChange: function(newColumnValue, columnName) {
    var newSchemaValue = this.props.dataSchema;
    var columnNumber = 0;
    for(columnNumber; columnNumber < newSchemaValue.length; columnNumber++) {
      if(newSchemaValue[columnNumber][1] == columnName) {
        newSchemaValue[columnNumber][0] = newColumnValue;
        break;
      }
    }
    // update data to match schema
    var newData = this.props.data;
    newData.map(function(row) {
      var newRow = row;
      if(newColumnValue == 'string'){
        newRow[columnNumber] = row[columnNumber].toString();
      } else if(newColumnValue == 'number') {
        newRow[columnNumber] = Number.parseFloat(row[columnNumber]);
      }
      return newRow;
    })
    this.props.updateTransformFunction(newData, newSchemaValue);
  },
  render: function() {
    var currentComponentCustomOptions = this.props.customInputOptions
      , inputComponents = [];

    if(this.props.dataSchema.length != 0) {
      this.props.dataSchema.forEach(function(column) {
        inputComponents.push(<LensInputField name={column[1]}
          key={column[1]}
          inputType='columnType'
          visibleName  = {column[1]}
          action={this.handleSchemaChange}
          initialValue={column[0]}/>);
      }, this);
    }

    for(var option in currentComponentCustomOptions) {
      var optionObject = currentComponentCustomOptions[option];
      var inputComponent;
      if(currentComponentCustomOptions.hasOwnProperty(option) && optionObject.configurable){
        if(optionObject['configurable'] == 'column') {
          inputComponent = (<LensInputField inputType ='column'
            initialValue = {optionObject['value']}
            name         = {option}
            visibleName  = {optionObject['name']}
            key          = {option}
            possibleValues = {this.props.dataSchema.map((schema) => { return schema[1] })}
            action       = {this.props.updateStateBasedOnCustomValues}/>)
        } else if(optionObject['configurable'] == 'enum') {
          inputComponent = (<LensInputField inputType = {optionObject['configurable']}
            initialValue = {optionObject['value']}
            name         = {option}
            visibleName  = {optionObject['name']}
            key          = {option}
            possibleValues = {optionObject['options']}
            action       = {this.props.updateStateBasedOnCustomValues}/>)
        } else {
          inputComponent = (<LensInputField inputType = {optionObject['configurable']}
            initialValue = {optionObject['value']}
            name         = {option}
            visibleName  = {optionObject['name']}
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
