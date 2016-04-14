import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

/*
Get Survey Data
*/

const selectRowProp = {
  mode: 'radio',
  clickToSelect: true  // enable click to select
};



var Table = React.createClass({
 render() {
    return (
    <BootstrapTable ref={this.props.myref} data={this.props.surveys} selectRow={ selectRowProp }>
        <TableHeaderColumn dataField="_id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="surveyLeader" dataSort={true}>Survey Name</TableHeaderColumn>
        <TableHeaderColumn dataField="site" dataSort={true} dataFormat={priceFormatter}>Leader</TableHeaderColumn>
    </BootstrapTable>
  )}
});

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
  getInitialState: function() {
    return {"surveys":[ {"_id":"John", "surveyLeader":"Doe", "site":"site"}]};
  },  
  componentDidMount: function() {
    this.serverRequest = $.get("http://128.199.240.53:3001/api/surveys?populate=volunteers&populate=surveyLeader&populate=sites", function (result) {
        this.setState({
            surveys: result
        });
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render() {
    return (<div>
                <Panel heading={"Active Surveys"} type={"primary"}><Table surveys={this.state.surveys} /></Panel>
                <button onClick={this.handleBtnClick}>Add</button>
                Nathan was here!
            </div>)
  }
})
