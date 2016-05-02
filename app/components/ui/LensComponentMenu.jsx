var React = require('react');
var LensOvalButton = require('./LensOvalButton');
var lensComponentModel = require('../../models/lensComponentModel.js');


var LensComponentMenu = React.createClass({
  getInitialState: function() {
    return {
      value: "",
      inputField: false
    }
  },
  handleInputChange: function(e) {
    this.setState({
      value: e.target.value
    })
  },
  handleKeyDown: function(e) {
    // on pressing enter add the component
    if (e.keyCode == 13)  {this.addCustomComponent(this.state.value);}
  },
  toggleInputFields: function() {
    if (this.state.inputField) {
      this.setState({inputField: false});
    } else {
      this.setState({inputField: true});
    }
  },
  addCustomComponent: function(componentName) {
    this.toggleInputFields();
    this.props.addCustomComponent(componentName);
  },
  render: function() {
    var dataCmps = []
      , inputFields = []
      , transformCmps = []
      , dataDiv
      , menu
      , transformAndViz
      , vizCmps = [];

    if(this.state.inputField) {
      // Abstract this into input field
      inputFields = [];
      inputFields.push(<input id='add-component-value'
        type='text'
        value={this.state.value}
        placeholder="ENTER URL"
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        />);
      inputFields.push( <LensOvalButton key='submit-new-component'
        margin='5px'
        action={this.addCustomComponent}
        actionPayload={this.state.value}
        content='DONE' />)
      inputFields.push( <LensOvalButton key='cancel-new-component'
        margin='5px'
        action={this.toggleInputFields}
        actionPayload={null}
        content='CANCEL' />)
    } else {
      inputFields = [];
      inputFields.push(<LensOvalButton key='add-new-component'
        margin='5px'
        action={this.toggleInputFields}
        actionPayload={null}
        content='ADD NEW COMPONENT' />)
    }

    if(this.props.lensComponentLibrary) {
      this.props.lensComponentLibrary.forEach(function(cmp, id) {
        var el = <LensOvalButton key={id}
          backgroundColor='#E0E0E0'
          content={cmp.name}
          actionPayload={new lensComponentModel(cmp.type)}
          border='none'
          action={this.props.addComponent}
          margin='5px'/>;

        if(cmp.metaData.type == 'data') {
          dataCmps.push(el);
        } else if (cmp.metaData.type == 'transform') {
          transformCmps.push(el);
        } else if (cmp.metaData.type == 'viz') {
          vizCmps.push(el);
        }
      }, this);
    }


    dataDiv =
      <div className='lens-component-menu-instructions'>
        <p>
          To get started making a graph
          you first have to get some data into Lenses.
        </p>
        <p>
          Pick one of the following components to pull data in:
        </p>
        <div className='lens-component-menu-components'>
          {dataCmps}
        </div>
      </div>;

    transformAndViz =
      <div>
        <div className='lens-component-menu-instructions'>
          <p>
            Now you can either transform data using one of the transform components
            or visualize it using one of the visualization components.
          </p>
          <p>
            If a component doesn't exist that fits your needs you can make a request
            for one by opening up an <a href='https://github.com/lenses/lenses-react/issues'>issue here</a> or you can <a href='https://github.com/lenses/lenses-react'>read instructions </a>on how to build your own.
          </p>
        </div>
        <div className='lens-component-menu-header'>
          Transforms:
        </div>
        <div className='lens-component-menu-components'>
          {transformCmps}
        </div>
        <div className='lens-component-menu-header'>
          Visualizations:
        </div>
        <div className='lens-component-menu-components'>
          {vizCmps}
        </div>
      </div>;

    menu = (this.props.firstNode) ? dataDiv : transformAndViz;

    return (
      <div className='lens-component-menu'>
        {menu}
      </div>
    )
  }
});

module.exports = LensComponentMenu;
