var React = require('react');


module.exports = React.createClass({
  getInitialState: function() {
    return {
      result: []
    }
  },
  componentDidMount: function() {
    this.props.lenses(function(result) {
      this.setState({
        result: result
      });
    }.bind(this));
  },
  render: function() {
    return (
      <div className='lens-list'>
        <div>List of Public Lenses:</div>
        {this.state.result.map(function(lens){
          return (<div>
            <a href={'/lenses/' + lens.id + '/edit'}>{lens.get('title')}</a> -- by {lens.get('author')}
          </div>)
        })}
      </div>
           )
  }
});

