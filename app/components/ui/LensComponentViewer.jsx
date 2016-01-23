var React          = require('react'),
    LensDataViewer = require('./LensDataViewer.jsx');

var LensComponentViewer = React.createClass({
  saveViewComponentState: function() {
    // Using refs here so that component creators get the benefit of saving their components
    // state automagically
    var currentComponent = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];
    var currentComponentState = this.refs.currentViewComponent.state;
    var customOptions = (this.refs.currentViewComponent.getCustomOptions) ? this.refs.currentViewComponent.getCustomOptions() : {};
    // Save state and whether options are configurable to the lensModel representing the component
    if(currentComponent && currentComponentState){
      for(var option in currentComponentState) {
        if(currentComponentState.hasOwnProperty(option)){
          // add to the lenscomponentmodel the current value and whether it's configurable
          currentComponent.customInputOptions[option] = {
            value: currentComponentState[option],
            configurable: (customOptions[option]) ? customOptions[option] : false
          }
        }
      }
    }
  },
  loadViewComponentState: function() {
    var currentComponent = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];
    var stateObject = {};
    for(var option in currentComponent.customInputOptions) {
      if(currentComponent.customInputOptions.hasOwnProperty(option)) {
        stateObject[option] = currentComponent.customInputOptions[option].value;
      }
    }
    this.refs.currentViewComponent.setState(stateObject);
  },
  updateStateBasedOnCustomValues: function(value, name) {
    var state = {};
    state[name] = value;
    this.refs.currentViewComponent.setState(state);
  },
  componentDidMount: function() {
    var currentComponent = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];
    // Load if customInputOptions have been saved otherwise save and render custom input components
    if(Object.keys(currentComponent.customInputOptions).length !== 0){
      this.loadViewComponentState();
    } else {
      this.saveViewComponentState();
    }
    this.props.setupCustomInputComponents(this.updateStateBasedOnCustomValues);
  },
  componentWillUnmount: function() {
    this.saveViewComponentState();
  },
  componentWillReceiveProps: function(nextProps) {
    // if switching to a new component, save the current components state
    if(nextProps.currentSelectedTrack !== this.props.currentSelectedTrack ||
       nextProps.currentSelectedNode  !== this.props.currentSelectedNode) {
       this.saveViewComponentState();
    }
  },
  componentDidUpdate: function(prevProps) {
    // If the view component switched the active view component
    // load the customInput state into the component
    if(prevProps.currentSelectedTrack !== this.props.currentSelectedTrack ||
       prevProps.currentSelectedNode  !== this.props.currentSelectedNode) {
         this.props.setupCustomInputComponents(this.updateStateBasedOnCustomValues);
         this.loadViewComponentState();
    }
  },
  render: function() {

    var CurrentlySelectedCmp = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];

    return (
      <div className='lens-component-viewer'>
        <CurrentlySelectedCmp.reactCmp ref='currentViewComponent'
          updateTransformFunction={this.props.updateTransformFunction}
          data={this.props.data}
          dataSchema={this.props.dataSchema}/>
        <LensDataViewer data={this.props.data} dataSchema={this.props.dataSchema} />
      </div>
    )
  }
});

module.exports = LensComponentViewer;
