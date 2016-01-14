var React          = require('react'),
    LensDataViewer = require('./LensDataViewer.jsx'),
    LensInputField = require('./LensInputField.jsx');

var LensComponentViewer = React.createClass({
  getInitialState: function() {
    return {
      inputComponents: [],
      currentlySelectedCmp: this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode]
    }
  },
  handleChangeInputs: function(value, name) {
    // Once an input has changed reflect that in the state
    // of the currently viewed component
    var newState = {};
    newState[name] = value;
    this.refs.currentViewComponent.setState(newState);
    // Save the value to the model so we can use it next time in the session
    this.state.currentlySelectedCmp.customInputOptions[name] = value;
  },
  updateInputComponents: function(customOptions, customOptionsInitialValues) {
    var inputComponents = [];
    for(var option in customOptions) {
      if(customOptions.hasOwnProperty(option)) {
        inputComponents.push(<LensInputField inputType    = {customOptions[option]}
          initialValue = {this.state.currentlySelectedCmp.customInputOptions[option] || customOptionsInitialValues[option]}
          name         = {option}
          key          = {option}
          action       = {this.handleChangeInputs}/>);
      }
    }
    // Generate the input components on the fly based on the currently selected component and render them
    this.setState({
      inputComponents: inputComponents
    })
  },
  saveCustomOption: function(key, value) {
    this.state.currentlySelectedCmp.customInputOptions[key] = value;
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      currentlySelectedCmp: this.props.tracks[this.props.currentSelectedTrack][nextProps.currentSelectedNode],
      inputComponents: []
    });
  },
  componentDidUpdate: function() {
    this.state.inputComponents.forEach(function(option){
        this.handleChangeInputs(option.props.initialValue, option.props.name);
    }.bind(this));
  },
  render: function() {

    var CurrentlySelectedCmp = this.state.currentlySelectedCmp;

    return (
      <div className='lens-component-viewer'>
        <CurrentlySelectedCmp.reactCmp ref='currentViewComponent'
          updateTransformFunction={this.props.updateTransformFunction}
          updateDataSchema={this.props.updateDataSchema}
          data={this.props.data}
          getInitialInputValues={this.updateInputComponents}
          saveCustomOption={this.saveCustomOption}
          customOptions={CurrentlySelectedCmp.customInputOptions}
          dataSchema={this.props.dataSchema}/>
        <LensDataViewer data={this.props.data} dataSchema={this.props.dataSchema} />
        <div className='lens-component-custom-inputs'>
          <div>Configurable Values</div>
          {this.state.inputComponents}
        </div>
      </div>
    )
  }
});

module.exports = LensComponentViewer;
