import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


var products = [
  {
      id: 1,
      survey: "Hallet Cove",
      location: "Lower",
      leader: "Jim Smith",
      date: "19-10-2010"
  },
  {
      id: 2,
      survey: "Hallet Cove",
      location: "Middle",
      leader: "Jim Smith",
      date: "19-10-2010"
  },
  {
      id: 3,
      survey: "Hallet Cove",
      location: "High",
      leader: "Jim Smith",
      date: "19-10-2010"
  },
  {
      id: 4,
      survey: "Best Beach",
      location: "Lower",
      leader: "Tom Grimble",
      date: "22-10-2010"
  }
];

function priceFormatter(cell, row){
  return cell;
}

export default React.createClass({
  render() {
    return ( 
    <BootstrapTable data={products} striped={true} hover={true}>
        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
        <TableHeaderColumn dataField="survey" dataSort={true}>Survey Name</TableHeaderColumn>
        <TableHeaderColumn dataField="leader" dataSort={true} dataFormat={priceFormatter}>Leader</TableHeaderColumn>
        <TableHeaderColumn dataField="date"  dataSort={true} dataFormat={priceFormatter}>Date</TableHeaderColumn>
    </BootstrapTable>
    )}
})
