var React          = require('react'),
    LensDataViewer = require('./LensDataViewer.jsx'),
    LensInputField = require('./LensInputField.jsx');

var LensComponentViewer = React.createClass({
  getInitialState: function() {
    return {
      inputComponents: []
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
    var inputComponents  = [],
        currentComponent = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];

    for(var option in customOptions) {
      if(customOptions.hasOwnProperty(option)) {
        // Load the input components with the saved changed value or the default initial value
        inputComponents.push(<LensInputField inputType    = {customOptions[option]}
          initialValue = {currentComponent.customInputOptions[option] || customOptionsInitialValues[option]}
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
  componentWillReceiveProps: function() {
    // Using refs here so that component creators get the benefit of saving their components
    // state automagically

    var currentComponent = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];

    // Before switching to new component save the state of the input components
    if(currentComponent && this.refs.currentViewComponent) {
      currentComponent.customInputOptions = this.refs.currentViewComponent.state;
    }

    // Switch to new component
    this.setState({
      inputComponents: []
    });
  },
  componentDidUpdate: function() {
    // Add input components for the new component on the screen
    var currentComponent = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];
    if(this.state.inputComponents.length == 0 && this.refs.currentViewComponent.getCustomOptions){
      this.updateInputComponents(this.refs.currentViewComponent.getCustomOptions(), this.refs.currentViewComponent.state);
    }
    // Load save input options values from the model
    this.refs.currentViewComponent.setState(currentComponent.customInputOptions);
  },
  render: function() {

    var CurrentlySelectedCmp = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];


    return (
      <div className='lens-component-viewer'>
        <CurrentlySelectedCmp.reactCmp ref='currentViewComponent'
          updateTransformFunction={this.props.updateTransformFunction}
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
