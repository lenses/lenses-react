var React = require('react');

var LensInputField = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.initialValue
    }
  },
  handleChangeInputs: function(e) {
    var newValue;
    if(this.props.inputType == 'enum' || this.props.inputType == 'number') {
      newValue = parseFloat(e.target.value)
    } else {
      newValue = e.target.value
    }
    this.props.action(newValue, this.props.name);
    this.setState({
      value: newValue
    });
  },
  render: function(){
    var wrapperStyles = {
      margin: this.props.margin,
      display: this.props.display,
      width:  this.props.width
    }
    var inputType;
    if (this.props.inputType === 'columnType') {
      inputType = <select name={this.props.name} 
        value={this.state.value}
        onChange={this.handleChangeInputs}>
      <option value='string' >string</option>
      <option value='number' >number</option>
      </select>;
    } else if (this.props.inputType =='enum') {
      var options = this.props.possibleValues.map((value, i) => {
        return <option key={i} value={i}>{value}</option>;
      });
      inputType = <select multiple={false || this.props.multipleSelect}
        name={this.props.name}
        value={this.state.value}
        onChange={this.handleChangeInputs}>
        {options}
      </select>;
    }  else {
      inputType = (<input type  = {this.props.inputType}
        value = {this.state.value}
        onChange={this.handleChangeInputs}/>)
    }
    return (
      <div style={wrapperStyles} className='lens-input-field-wrapper'>
        {this.props.name}:
        <div className='lens-input-field'>
          {inputType}
        </div>
      </div>
    );
  }
});

module.exports = LensInputField;
