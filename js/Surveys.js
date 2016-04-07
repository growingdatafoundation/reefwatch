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
      survey: "Nathan Beach",
      location: "Lower",
      leader: "Tom Grimble",
      date: "22-10-2010"
  }
];


var completed = [
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
  }
];

const selectRowProp = {
  mode: 'radio',
  clickToSelect: true  // enable click to select
};



var Table = React.createClass({
 render() {
    return (
    <BootstrapTable ref={this.props.myref} data={this.props.surveys} selectRow={ selectRowProp }  hover={true}>
        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="survey" dataSort={true}>Survey Name</TableHeaderColumn>
        <TableHeaderColumn dataField="leader" dataSort={true} dataFormat={priceFormatter}>Leader</TableHeaderColumn>
        <TableHeaderColumn dataField="date"  dataSort={true} dataFormat={priceFormatter}>Date</TableHeaderColumn>
    </BootstrapTable>
  )}
})

var Panel = React.createClass({
    render() {
        return (<div className={"panel panel-"+this.props.type}>
                    <div className="panel-heading">{this.props.heading}</div>
                    <div className="panel-body">{this.props.children}</div>
                </div>)
    }
})

var fakeRow =   {
      id: 200,
      survey: "Hallet Cove",
      location: "Middle",
      leader: "Jim Smith",
      date: "19-10-2010"
  };



function priceFormatter(cell, row){
  return cell;
}

export default React.createClass({

  handleBtnClick: function(e) {
    this.refs.ExampleTable.handleAddRow(fakeRow);
  },

  render() {
    return (<div><Panel heading={"Active Surveys"} type={"primary"}><Table surveys={products} /></Panel>
                <Panel heading={"Completed Surveys"} type={"info"}><Table surveys={completed} /></Panel>


    <BootstrapTable ref="ExampleTable" data={completed} selectRow={ selectRowProp }  hover={true}>
        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="survey" dataSort={true}>Survey Name</TableHeaderColumn>
        <TableHeaderColumn dataField="leader" dataSort={true} dataFormat={priceFormatter}>Leader</TableHeaderColumn>
        <TableHeaderColumn dataField="date"  dataSort={true} dataFormat={priceFormatter}>Date</TableHeaderColumn>
    </BootstrapTable>


                <button onClick={this.handleBtnClick}>Add</button>
            </div>)
  }
})
