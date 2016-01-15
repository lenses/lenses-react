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
    } else if (this.props.inputType === 'columnSelect') {
      inputType = [];
      inputType.push(<select name={this.props.name} value={this.state.value} onChange={this.handleChangeInputs}>);
      inputType.push(<option value='string' >string</option>);
      inputType.push(<option value='number' >number</option>);
      inputType.push(</select>);
    }
    return (
      <div style={wrapperStyles} className='lens-input-field-wrapper'>
        {this.props.name}:{inputType}
      </div>
    );
  }
});

module.exports = LensInputField;
