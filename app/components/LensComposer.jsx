var React = require('react');
var LensNode = require('./LensNode.jsx');
var LensSave = require('./LensSave.jsx');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Lens</h1>
        <div>
          { this.props.nodes.map(function(node,index){
              return (
                <LensNode node={node} key={"node"+index}/>
              )
            })
          }
        </div>
        <LensSave/>
      </div>
    )
  }
})