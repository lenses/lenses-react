var React          = require('react')
  ,  LensDataViewer = require('./LensDataViewer.jsx')
  ,  LensComponentOptionsInspector = require('./LensComponentOptionsInspector.jsx')
  ,  LensComponentActionMenu = require('./LensComponentActionMenu');

var LensComponentViewer = React.createClass({
  getInitialState: function() {
    return {
      customInputOptions: []
    }
  },
  saveViewComponentState: function() {
    // Using refs here so that component creators get the benefit of saving their components
    // state automagically
    var currentComponent = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];
    var currentComponentState = this.refs.currentViewComponent.state;
    var customOptions = (this.refs.currentViewComponent.getCustomOptions) ? this.refs.currentViewComponent.getCustomOptions() : {};
    // Save state and whether options are configurable to the lensModel representing the component
    if(currentComponent && currentComponentState){
      // Save the component's state
      // If it is a customInputOption i.e. right hand panel then save it's type
      // otherwise it's not configurable and it's ui is handled by the component itself
      Object.keys(currentComponentState).forEach(function(option) {
          currentComponent.customInputOptions[option] = {
            value: currentComponentState[option],
            options: (customOptions[option] && customOptions[option]['type'] == 'enum') ? customOptions[option]['options'] : null,
            name: (customOptions[option]) ? customOptions[option]['name'] : null,
            configurable: (customOptions[option]) ? customOptions[option]['type'] : false
          }
      });
   }
   if(this.state.customInputOptions.length == 0) {
     this.setState({customInputOptions: currentComponent.customInputOptions});
   }
  },
  loadViewComponentState: function() {
    var currentComponent = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];
    var stateObject = {};
    Object.keys(currentComponent.customInputOptions).forEach(function(option) {
      stateObject[option] = currentComponent.customInputOptions[option].value;
    });
    this.refs.currentViewComponent.setState(stateObject);
   this.setState({customInputOptions: currentComponent.customInputOptions});
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
    var haveSwitchedComponent = prevProps.currentSelectedTrack !== this.props.currentSelectedTrack ||
      prevProps.currentSelectedNode  !== this.props.currentSelectedNode;


    if(haveSwitchedComponent) {
       this.loadViewComponentState();
     } else {
       this.saveViewComponentState();
     }

  },
  render: function() {

    var CurrentSelectedCmp = this.props.tracks[this.props.currentSelectedTrack][this.props.currentSelectedNode];
    var dataViewer = this.props.getDataAtNode(this.props.currentSelectedNode);
    var data = this.props.getDataAtNode(this.props.currentSelectedNode-1);

    return (
      <div className='lens-component-viewer'>
        <LensComponentActionMenu
          currentSelectedNode={this.props.currentSelectedNode}
          deleteComponent={this.props.deleteComponent}/>
        <LensComponentOptionsInspector
          customInputOptions={this.state.customInputOptions}
          updateStateBasedOnCustomValues={this.updateStateBasedOnCustomValues}
          updateTransformFunction={this.props.updateTransformFunction}
          data={data}
          dataSchema={this.props.dataSchema} />
        <div className='lens-component-viewer-current-component'>
          <CurrentSelectedCmp.reactCmp  ref='currentViewComponent'
            updateTransformFunction={this.props.updateTransformFunction}
            selectedColumns={this.props.selectedColumns}
            data={data}
            dataSchema={this.props.dataSchema}/>
        </div>
        <LensDataViewer data={dataViewer} dataSchema={this.props.dataSchema} />
      </div>
    )
  }
});

module.exports = LensComponentViewer;
