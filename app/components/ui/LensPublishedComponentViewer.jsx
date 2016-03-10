var React          = require('react')
, lensComponentModel = require('../../models/lensComponentModel.js');

module.exports = React.createClass({
  // Hard coded to one track for now
  getInitialState: function() {
    return {
      tracks: null,
      selectedColumns: 'all',
      outputComponentIndex: null,
      data: [],
      dataSchema: []
    }
  },
  componentWillMount: function() {
    if(window.lensId) {
      this.load(window.lensId);
    }
  },
  componentDidUpdate: function() {
    var currentComponent = this.state.tracks[0][this.state.outputComponentIndex];
    if(Object.keys(currentComponent.customInputOptions).length !== 0){
      this.loadViewComponentState();
    }
  },
  loadViewComponentState: function() {
    var currentComponent = this.state.tracks[0][this.state.outputComponentIndex];
    var stateObject = {};
    Object.keys(currentComponent.customInputOptions).forEach(function(option) {
      stateObject[option] = currentComponent.customInputOptions[option].value;
    });
    this.refs.currentViewComponent.setState(stateObject);
  },
  load: function(lensId) {
    if(lensId) {
    this.props.loadLens(function(lens) {
      if(lens.message) {
        alert('Lens Does Not Exist; Redirecting you to lens directory');
        window.location.replace('/lenses/');
      }
      var tracks = lens.get('tracks');
      var newTracks = tracks.map(function(track){
        var newTrack = track.map(function(node){
          // Need to recreate model using type and data
          return new lensComponentModel(node.type, null, node.customInputOptions);
          })
        return newTrack;
        });
        this.setState({
          tracks: newTracks,
          data: lens.get('outputData'),
          dataSchema: lens.get('dataSchema'),
          selectedColumns: lens.get('selectedColumns'),
          outputComponentIndex: newTracks[0].length -1,
          publishState: {published: true, id: window.lensId}
        });
      }.bind(this));
    }
  },
  render: function() {

    var CurrentlySelectedCmp = null;
    if(this.state.tracks) {
      CurrentlySelectedCmp = this.state.tracks[0][this.state.outputComponentIndex].reactCmp;
    }

    var lensesLinkStyle = {
      verticalAlign: 'super',
      marginLeft: '10px'
    };
    var logoStyle = {
      marginLeft: '5px',
      marginTop: '5px'
    }
    var attributionDivStyle = {
      marginTop: '20px',
      marginLeft: '5px'
    }
    return (
      <div className='lens-published-component-viewer'>
        <div style={attributionDivStyle}>
          <div>
            <img style={logoStyle} src='/public/images/lenses-logo.png' width='30px' height='25px'/>
            <a href={window.location.host + '/lenses/' + window.lensId + '/edit'} target='_blank'>
              <span style={lensesLinkStyle}>Download Data</span>
            </a>
            <div>Lenses</div>
          </div>
        </div>
        {(CurrentlySelectedCmp) ?  <CurrentlySelectedCmp ref='currentViewComponent' selectedColumns={this.state.selectedColumns}
          data={this.state.data}
          dataSchema={this.state.dataSchema}/> : <div> loading </div>}
      </div>
    )
  }
});

