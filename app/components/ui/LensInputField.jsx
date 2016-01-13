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
    return (
      <div style={wrapperStyles} className='lens-input-field-wrapper'>
        {this.props.name}
        <input type  = {this.props.inputType}
               value = {this.state.value}
               onChange={this.handleChangeInputs}/>
      </div>
    );
  }
});

module.exports = LensInputField;
