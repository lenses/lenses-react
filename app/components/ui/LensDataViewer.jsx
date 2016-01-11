var React = require('react');
var $ = require('jquery');
var dt = require('datatables.net')(window, $);


var LensDataViewer = React.createClass({
  createTable: function() {
    var config = {
      destroy: true,
      columns: this.props.columns.map(function(columnArray) {
        return {'title': columnArray[1]};
      }),
      data: this.props.data
    }
    $('#example').DataTable(config);
  },
  componentDidMount: function() {
    this.createTable();
  },
  componentDidUpdate: function() {
    if($.fn.DataTable.isDataTable('#example')) {
      $('#example').DataTable().destroy();
      $('#example').empty();
    }
    this.createTable();
  },
  render: function() {

    return (
      <div className='lens-data-viewer'>
        <table id="example" className="display" width="100%"></table>
      </div>
    )
  }
});

module.exports = LensDataViewer;
