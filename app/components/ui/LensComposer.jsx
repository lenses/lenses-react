var React = require('react');

// LensUI React Components
var LensTitleBar = require('./LensTitleBar');
var LensTrackManager = require('./LensTrackManager');
var LensComponentMenu = require('./LensComponentMenu');
var LensComponentActionMenu = require('./LensComponentActionMenu');
var LensComponentViewer = require('./LensComponentViewer');
var LensShareButton = require('./LensShareButton');
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
      componentCustomInputOptions: null
    }
  },
  componentWillMount: function() {
    // Load Initial Components
    this.props.loadInitialComponents(function(initialComponents) {
      this.setState({
        lensComponentLibrary: initialComponents
      });
    }.bind(this));
    // Load Test Data for development
    // this.addComponent(new lensComponentModel('TestData'));
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
    // If the function is not null add it as a new transform function
    if(func != null) {
      var cmp = tracks[this.state.currentSelectedTrack][this.state.currentSelectedNode];
      cmp.transformData = func;
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
      <div id='lens-composer'>
        <LensTitleBar />
        <LensShareButton />
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
