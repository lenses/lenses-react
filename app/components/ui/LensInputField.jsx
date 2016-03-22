var React = require('react');

var LensInputField = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.initialValue
    }
  },
  handleChangeInputs: function(e) {
    this.props.action(e.target.value, this.props.name);
    this.setState({
      value: e.target.value
    });
  },
  render: function(){
    var wrapperStyles = {
      margin: this.props.margin,
      display: this.props.display,
      width:  this.props.width
    }
    var inputType;
    if(this.props.inputType !== 'columnSelect') {
      inputType = (<input type  = {this.props.inputType}
        value = {this.state.value}
        onChange={this.handleChangeInputs}/>)
    } else if (this.props.inputType === 'columnType') {
      inputType = <select name={this.props.name} value={this.state.value} onChange={this.handleChangeInputs}>
      <option value='string' >string</option>
      <option value='number' >number</option>
      </select>;
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
