var React = require('react');
// TODO:Calculate the hover state automatically based on the background color of the button using the 
// onMouseEnter and onMouseExit states
var shadeColor = function (color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

var LensOvalButton = React.createClass({
  handleAction: function() {
    this.props.action(this.props.actionPayload);
  },
  render: function(){
    var styles = {
      backgroundColor: this.props.backgroundColor,
      border: this.props.border
    };
    var wrapperStyles = {
      margin: this.props.margin,
      display: this.props.display,
      width:  this.props.width
    }
    return (
      <div style={wrapperStyles} className='lens-oval-button-wrapper' >
        <div style={styles} className='lens-oval-button'
                            onClick={this.handleAction}>
          {this.props.content}
        </div>
      </div>
    );
  }
});

module.exports = LensOvalButton;
