var React = require('react');

// LensUI React Components
var LensTitleBar = require('./LensTitleBar');
var LensTrackManager = require('./LensTrackManager');
var LensComponentMenu = require('./LensComponentMenu');
var LensComponentActionMenu = require('./LensComponentActionMenu');
var LensComponentViewer = require('./LensComponentViewer');
var LensPublishButton = require('./LensPublishButton');
var LensInputField = require('./LensInputField.jsx');

var lensComponentModel = require('../../models/lensComponentModel.js');

module.exports = React.createClass({
  getInitialState: function() {
    // TODO:Data and Dataschema are not really part of the state
    // Refactor to remove them and remove functions that manipulate them to
    // LensComponentVieLenw. They are calculated on the fly
    return {
      lensComponentLibrary: [],
      data: [],
      dataSchema: [],
      tracks: [[]],
      currentSelectedTrack: 0,
      currentSelectedNode: null,
      componentCustomInputOptions: null,
      selectedColumns: 'all',
      title: '',
      author: '',
      id: null
    }
  },
  componentWillMount: function() {
    // Load Initial Components
    this.props.loadInitialComponents(function(initialComponents) {
      this.setState({
        lensComponentLibrary: initialComponents
      });
    }.bind(this));
    // Load Data if available
    if(window.lensId) {
      this.load(window.lensId);
    }
    // Load Test Data for development
    // this.addComponent(new lensComponentModel('TestData'));
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
          title: lens.get('title'),
          author: lens.get('author'),
          tracks: newTracks,
          selectedColumns: lens.get('selectedColumns'),
          id: window.lensId
        });
      }.bind(this));
    }
  },
  save: function() {
    if(this.state.title == '' || this.state.author == '') {
      alert('you need to have a title and an author')
      return
    }

    var successCallback = function(lensObj) {
      this.setState({
        id: lensObj.id
      });

    }.bind(this);

    var lensData = {
      tracks: this.state.tracks,
      title: this.state.title,
      author: this.state.author,
      data: this.getDataAtNode(this.state.tracks.length - 1),
      dataSchema: this.state.dataSchema,
      selectedColumns: this.state.selectedColumns
    }

    this.props.saveLens(lensData, successCallback);
  },
  updateSelectedNode: function(newSelectedValue) {
    // When the user deletes the first node and there are more nodes in the track, select the new first node
    if (newSelectedValue !== null && newSelectedValue < 0 && this.state.tracks[this.state.currentSelectedTrack].length > 0) {
      newSelectedValue = 0;
      // When the user deletes the first node and there are no more nodes, default to add component
    } else if (newSelectedValue < 0) {
      newSelectedValue = null;
      this.updateDataSchema([])
    }
    // Update node with the new selectedNode Value
    this.setState({
      currentSelectedNode: newSelectedValue,
      data: this.getDataAtNode(newSelectedValue)
    });
  },
  getDataAtNode: function(currentNode) {
    var startNode = -1;
    var data = [];
    var maxNode = (currentNode != null) ? currentNode : startNode;
    return (function recurseData(maxNode, data, startNode) {
      startNode++;
      if (startNode <= maxNode) {
        return recurseData.call(this, maxNode, this.state.tracks[this.state.currentSelectedTrack][startNode].transformData(data), startNode);
      }
      return data;
    }.bind(this))(maxNode, data, startNode);
  },
  addComponent: function(cmp) {
    var tracks  = this.state.tracks.slice(0);
    tracks[this.state.currentSelectedTrack].push(cmp)
    this.setState({
      tracks: tracks
    });
    this.updateSelectedNode(this.state.tracks[this.state.currentSelectedTrack].length-1);
  },
  deleteComponent: function() {
    var tracks = this.state.tracks.slice(0);
    tracks[this.state.currentSelectedTrack].splice(this.state.currentSelectedNode, 1);
    this.setState({
      tracks: tracks
    });
    this.updateSelectedNode((this.state.currentSelectedNode-1));
  },
  updateDataSchema: function(dataSchema) {
    this.setState({
      dataSchema: dataSchema
    });
  },
  updateTransformFunction: function(func, dataSchema) {
    var tracks = this.state.tracks.slice(0);
    var cmp = tracks[this.state.currentSelectedTrack][this.state.currentSelectedNode];
    // If the function is not null add it as a new transform function
    if(func != null && (func instanceof Function)) {
      cmp.transformData = func;
    // If they just passed data from an input component then wrap it in a function
    // and it saves the data in the closure
    } else if(func != null) {
      cmp.transformData = function() {
          return func;
      }
    }
    this.setState({
      tracks: tracks,
      data: this.getDataAtNode(this.state.currentSelectedNode),
      dataSchema: dataSchema || this.state.dataSchema
    });
  },
  addCustomComponent: function(type) {
    var newLibrary = this.state.lensComponentLibrary.slice(0);
    new lensComponentModel(type, function(newComponent){
      if(newComponent.reactCmp) {
        newLibrary.push(newComponent);
        this.setState({
          lensComponentLibrary: newLibrary
        });
      } else {
        alert('Component Does Not Exist');
      }
    }.bind(this));
  },
  handleSchemaChange: function(newColumnValue, columnName) {
    var newSchemaValue = this.state.dataSchema;
    var columnNumber = 0;
    for(columnNumber; columnNumber < newSchemaValue.length; columnNumber++) {
      if(newSchemaValue[columnNumber][1] == columnName) {
        newSchemaValue[columnNumber][0] = newColumnValue;
        break;
      }
    }
    // update data to match schema
    var newData = this.state.data;
    newData.map(function(row) {
      var newRow = row;
      if(newColumnValue == 'string'){
        newRow[columnNumber] = row[columnNumber].toString();
      } else if(newColumnValue == 'number') {
        newRow[columnNumber] = Number.parseFloat(row[columnNumber]);

      }
      return newRow;
    })
    var newTransformFunction = function() {
      return function() {
        return newData;
      }
    }
    this.updateTransformFunction(newTransformFunction(), newSchemaValue);
  },
  setSelectedColumns: function(selectedColumns) {
    this.setState({selectedColumns: selectedColumns});
  },
  setupCustomInputComponents: function(actionFunction) {
    var currentComponentCustomOptions = this.state.tracks[this.state.currentSelectedTrack][this.state.currentSelectedNode].customInputOptions;
    var inputComponents = [];
    for(var option in currentComponentCustomOptions) {
      var optionObject = currentComponentCustomOptions[option];
      if(currentComponentCustomOptions.hasOwnProperty(option) && optionObject.configurable){
        inputComponents.push(<LensInputField inputType = {optionObject['configurable']}
          initialValue = {optionObject['value']}
          name         = {option}
          key          = {option}
          action       = {actionFunction}/>);
      }
    }
    this.setState({
      componentCustomInputOptions: inputComponents
    })
  },
  updateTitleAndAuthor: function(state){
    this.setState(state);
  },
  render: function(){

    var viewPortMenu, lensComponentViewer, componentsCustomOptions = [];

    if(this.state.currentSelectedNode !== null) {
      viewPortMenu = <LensComponentActionMenu
        currentSelectedCmp={this.state.currentSelectedNode}
        deleteComponent={this.deleteComponent}/>;
        lensComponentViewer = <LensComponentViewer
            updateTransformFunction={this.updateTransformFunction}
            currentSelectedNode={this.state.currentSelectedNode}
            currentSelectedTrack={this.state.currentSelectedTrack}
            tracks={this.state.tracks}
            setupCustomInputComponents={this.setupCustomInputComponents}
            selectedColumns={this.state.selectedColumns}
            data={this.state.data}
            dataSchema={this.state.dataSchema} />;
        if(this.state.dataSchema.length != 0) {
          this.state.dataSchema.forEach(function(column) {
            componentsCustomOptions.push(<LensInputField name={column[1]}
              key={column[1]}
              inputType='columnSelect'
              action={this.handleSchemaChange}
              initialValue={column[0]}/>);
          }, this);
          componentsCustomOptions.push(<LensInputField name='columns'
            key='columns'
            inputType='text'
            action={this.setSelectedColumns}
            initialValue={this.state.selectedColumns}/>);
        }
        // add inputs to customize values in current viewable component
        if(this.state.componentCustomInputOptions) {
          this.state.componentCustomInputOptions.forEach(function(component){
            componentsCustomOptions.push(component);
          });
        }
    } else {
      viewPortMenu = <LensComponentMenu
        addComponent={this.addComponent}
        addCustomComponent={this.addCustomComponent}
        lensComponentLibrary={this.state.lensComponentLibrary} />;
    }


    return (
      <div className='lens-composer'>
        <div id='lens-title-bar-container'>
          <LensTitleBar id={this.state.id} title={this.state.title} author={this.state.author} updateTitleAndAuthor={this.updateTitleAndAuthor}/>
          <LensPublishButton id={this.state.id} save={this.save}/>
        </div>
        <LensTrackManager
          currentSelectedNode={this.state.currentSelectedNode}
          currentSelectedTrack={this.state.currentSelectedTrack}
          tracks={this.state.tracks}
          updateSelectedNode={this.updateSelectedNode} />
        <div className='lens-viewport'>
          {viewPortMenu}
          <div className={(componentsCustomOptions.length !== 0) ? 'lens-component-custom-inputs' : ''}>
            {componentsCustomOptions}
          </div>
          {lensComponentViewer}
        </div>
      </div>
    )
  }
})
