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
      dataSchema: [],
      tracks: [[]],
      currentSelectedTrack: 0,
      currentSelectedNode: null,
      componentCustomInputOptions: null,
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
  },
  load: function(lensId) {
    if(lensId) {
      this.props.loadLens(function(lens) {
        if(lens.message) {
          alert('Lens Does Not Exist; Redirecting you to lens directory');
          window.location.replace('/lenses/');
        }
        var tracks = lens.get('tracks');
        var newTracks = tracks.map((track) => {
          var newTrack = track.map((node) => {
            // Need to recreate model using type and data
            var lensModel = new lensComponentModel(node.type, null, node.customInputOptions);
            if(node.transformFunc) {
              var transformFunc = () => {
                return {
                  funcName: node.transformFunc.funcName,
                  funcParams: node.transformFunc.funcParams
                }
              }
            }
            this.updateTransformFunctionWithComponent(lensModel, transformFunc);
            return lensModel;
          })
          return newTrack;
        });

        // load input data for first node
        newTracks = this.updateTransformFunctionAtTrackAndNode(lens.get('inputData'),
                                                               newTracks,
                                                               this.state.currentSelectedTrack,
                                                               0);

                                                               this.setState({
                                                                 title: lens.get('title'),
                                                                 author: lens.get('author'),
                                                                 tracks: newTracks,
                                                                 data: lens.get('inputData'),
                                                                 dataSchema: lens.get('dataSchema'),
                                                                 outputWidth: lens.get('outputWidth'),
                                                                 outputHeight: lens.get('outputHeight'),
                                                                 selectedColumns: lens.get('selectedColumns'),
                                                                 currentSelectedNode: newTracks[0].length-1,
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
      window.location.href = '/lenses/' + lensObj.id + '/edit';
    }.bind(this);

    var lensData = {
      tracks: this.state.tracks,
      title: this.state.title,
      author: this.state.author,
      inputData: this.getDataAtNode(0),
      outputData: this.getDataAtNode(this.state.tracks[0].length - 1),
      outputWidth: parseInt(this.state.tracks[0][this.state.tracks[0].length-1].customInputOptions.width.value) || 600,
      outputHeight: parseInt(this.state.tracks[0][this.state.tracks[0].length-1].customInputOptions.height.value) || 400,
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
      currentSelectedNode: newSelectedValue
    });
  },
  getDataAtNode: function(currentNode) {
    var startNode = 0
      , maxNode = (currentNode != null) ? currentNode : startNode;

    return (function recurseData(data, startNode) {
      var dataCopy
        , transformedData;

      if (startNode <= maxNode) {
        dataCopy = JSON.parse(JSON.stringify(data));
        transformedData = this.state.tracks[this.state.currentSelectedTrack][startNode].transformData(dataCopy);
        startNode++;
        return recurseData.call(this, transformedData, startNode);
      }
      return data;
    }.bind(this))([], startNode);
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
  updateTransformFunctionWithComponent: function(cmp, func) {
    // If the function is not null add it as a new transform function
    if(func != null && (func instanceof Function)) {
      var funcData = func()
        , funcName = funcData.funcName
        , funcParams = funcData.funcParams;

      cmp.transformFunc = funcData;

      cmp.transformData = function (data) {
        var paramsWithData = funcParams.slice(0);
        paramsWithData.push(data);
        return cmp.reactCmp.prototype[funcName].apply(cmp.reactCmp, paramsWithData);
      }
    } else if(func != null) {
      // Otherwise wrap the data in a function
      cmp.transformFunc = null;
      cmp.transformData = function() {
        return func;
      }
    }
  },
  updateTransformFunctionAtTrackAndNode: function(func, tracks, trackIndex, nodeIndex) {
    var newTracks = tracks.slice(0);
    var cmp = newTracks[trackIndex][nodeIndex];
    this.updateTransformFunctionWithComponent(cmp, func);
    return newTracks;
  },
  updateTransformFunction: function(func, dataSchema) {
    var newTracks = this.updateTransformFunctionAtTrackAndNode(func, this.state.tracks, this.state.currentSelectedTrack, this.state.currentSelectedNode);
    this.setState({
      tracks: newTracks,
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
      var inputComponent;
      if(currentComponentCustomOptions.hasOwnProperty(option) && optionObject.configurable){
        if(optionObject['configurable'] == 'column') {
          inputComponent = (<LensInputField inputType ='enum'
            initialValue = {optionObject['value']}
            name         = {option}
            key          = {option}
            possibleValues = {this.state.dataSchema.map((schema) => { return schema[1] })}
            action       = {actionFunction}/>)
        } else {
          inputComponent = (<LensInputField inputType = {optionObject['configurable']}
            initialValue = {optionObject['value']}
            name         = {option}
            key          = {option}
            action       = {actionFunction}/>)
        }
        inputComponents.push(inputComponent);
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
          getDataAtNode={this.getDataAtNode}
          dataSchema={this.state.dataSchema} />;
          if(this.state.dataSchema.length != 0) {
            this.state.dataSchema.forEach(function(column) {
              componentsCustomOptions.push(<LensInputField name={column[1]}
                key={column[1]}
                inputType='columnType'
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
      <div className='lens-composer'>
        <div id='lens-title-bar-container'>
          <LensTitleBar id={this.state.id}
            width={this.state.outputWidth}
            height={this.state.outputHeight}
            title={this.state.title}
            author={this.state.author}
            updateTitleAndAuthor={this.updateTitleAndAuthor}/>
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
