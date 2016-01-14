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
  },
  updateInputComponents: function(customOptions, customOptionsInitialValues) {
    var inputComponents = [];
    for(var option in customOptions) {
      if(customOptions.hasOwnProperty(option)) {
        // Load the input components with the saved changed value or the default initial value
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
  componentDidMount: function() {
    if(this.refs.currentViewComponent.getCustomOptions){
      this.updateInputComponents(this.refs.currentViewComponent.getCustomOptions(), this.refs.currentViewComponent.state);
    }
  },
  componentWillReceiveProps: function(nextProps) {
    // Using refs here so that component creators get the benefit of saving their components
    // state automagically

    // Before switching to new component save the state of the input components
    this.state.currentlySelectedCmp.customInputOptions = this.refs.currentViewComponent.state;

    // Switch to new component
    this.setState({
      currentlySelectedCmp: this.props.tracks[this.props.currentSelectedTrack][nextProps.currentSelectedNode],
      inputComponents: []
    });
  },
  componentDidUpdate: function() {
    // Add input components for the new component on the screen
    if(this.state.inputComponents.length == 0 && this.refs.currentViewComponent.getCustomOptions){
      this.updateInputComponents(this.refs.currentViewComponent.getCustomOptions(), this.refs.currentViewComponent.state);
    }
    // Load save input options values from the model
    this.refs.currentViewComponent.setState(this.state.currentlySelectedCmp.customInputOptions);
  },
  render: function() {

    var CurrentlySelectedCmp = this.state.currentlySelectedCmp;

    return (
      <div className='lens-component-viewer'>
        <CurrentlySelectedCmp.reactCmp ref='currentViewComponent'
          updateTransformFunction={this.props.updateTransformFunction}
          updateDataSchema={this.props.updateDataSchema}
          data={this.props.data}
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
