var React = require('react');
var $ = require('jquery');
require('datatables.net')(window, $);


var LensDataViewer = React.createClass({
  createTable: function() {
    var config = {
      destroy: true,
      columns: this.props.dataSchema.map(function(columnArray) {
        return {'title': columnArray[1]};
      }),
      data: this.props.data
    }
    $('#lens-data-table').DataTable(config);
  },
  componentDidMount: function() {
    this.createTable();
  },
  componentDidUpdate: function() {
    if($.fn.DataTable.isDataTable('#lens-data-table')) {
      $('#lens-data-table').DataTable().destroy();
      $('#lens-data-table').empty();
    }
    this.createTable();
  },
  render: function() {

    return (
      <div className='lens-data-viewer'>
        <table id="lens-data-table" className="display" width="100%"></table>
      </div>
    )
  }
});

module.exports = LensDataViewer;
