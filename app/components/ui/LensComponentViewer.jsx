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
      Object.keys(currentComponentState).forEach(function(option) {
          currentComponent.customInputOptions[option] = {
            value: currentComponentState[option],
            configurable: (customOptions[option]) ? customOptions[option] : false
          }
      });
   }
  },
  loadViewComponentState: function() {
    var currentComponent = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];
    var stateObject = {};
    Object.keys(currentComponent.customInputOptions).forEach(function(option) {
      stateObject[option] = currentComponent.customInputOptions[option].value;
    });
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
  componentWillReceiveProps: function(nextProps) {
    // if switching to a new component, save the current components state
    if(nextProps.currentSelectedTrack !== this.props.currentSelectedTrack ||
       nextProps.currentSelectedNode  !== this.props.currentSelectedNode) {
       this.saveViewComponentState();
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    // If the view component switched the active view component
    // load the customInput state into the component
    if(prevProps.currentSelectedTrack !== this.props.currentSelectedTrack ||
       prevProps.currentSelectedNode  !== this.props.currentSelectedNode) {
         this.props.setupCustomInputComponents(this.updateStateBasedOnCustomValues);
         this.loadViewComponentState();
     } else {
     this.saveViewComponentState();
     }

  },
  render: function() {

    var CurrentlySelectedCmp = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];

    return (
      <div className='lens-component-viewer'>
        <CurrentlySelectedCmp.reactCmp ref='currentViewComponent'
          updateTransformFunction={this.props.updateTransformFunction}
          selectedColumns={this.props.selectedColumns}
          data={this.props.data}
          dataSchema={this.props.dataSchema}/>
        <LensDataViewer data={this.props.data} dataSchema={this.props.dataSchema} />
      </div>
    )
  }
});

module.exports = LensComponentViewer;
