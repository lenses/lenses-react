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
  componentDidMount: function() {
    var inputComponents = [];
    // Using refs here instead of callbacks so that component creators don't have to do
    // extra work or accidentally delete the callbacks in their components
    var refCurrentViewComponent = this.refs.currentViewComponent;
    // If there are custom options set in the component then add controls for them
    if(refCurrentViewComponent.getCustomOptions && refCurrentViewComponent.getInitialState){
      var customOptions = refCurrentViewComponent.getCustomOptions();
      var customOptionsInitialValues = refCurrentViewComponent.getInitialState();
      for(var option in customOptions) {
        if(customOptions.hasOwnProperty(option)) {
          inputComponents.push(<LensInputField inputType    = {customOptions[option]}
                                               initialValue = {customOptionsInitialValues[option]}
                                               name         = {option}
                                               key          = {option}
                                               action       = {this.handleChangeInputs}/>);
        }
      }
      // Generate the input components on the fly based on the currently selected component and render them
      this.setState({
        inputComponents: inputComponents
      })
    }
  },
  render: function() {

    var CurrentlySelectedCmp = null,
        data                 = this.props.data,
        columns              = this.props.columns,
        selectedNode         = this.props.currentSelectedNode;


    // 0 is the first element; null defaults to add new component menu
    if (selectedNode !== null)  {
      CurrentlySelectedCmp = this.props.tracks[this.props.currentSelectedTrack][selectedNode];
    }

    return (
      <div className='lens-component-viewer'>
        <CurrentlySelectedCmp.reactCmp ref='currentViewComponent' updateTransformFunction={this.props.updateTransformFunction} updateColumns={this.props.updateColumns} data={data} columns={this.props.columns}/>
        <LensDataViewer data={data} columns={columns} />
        {this.state.inputComponents}
      </div>
    )
  }
});

module.exports = LensComponentViewer;
