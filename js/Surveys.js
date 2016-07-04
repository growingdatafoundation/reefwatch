import React from 'react'
import config from "../config"
import FieldDay from "./ModalFieldDay"
import WorkingSurveyList from "./components/WorkingSurveyList"
import Panel from "./components/Panel"
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

/*
Author: Nathan Hill

Description:
Get Survey Data

*/

/*
*/
var Table = React.createClass({
  handleComplete: function (row) {
  },
  handleSelect: function (row) {
    $.publish("selectFieldDay", {location: row.description, date: row.date});
    this.props.onSelect(row);
  },
  BuildButtons: function(cell, row, enumObject){
    return <div className="btn-toolbar">
                <button onClick={this.handleComplete.bind(this, row)} className="btn btn-success btn-sm">Complete</button>
                <button onClick={this.handleSelect.bind(this, row)} className="btn btn-info btn-sm">Select</button>                
           </div>
 },
 render() {
    return (
    <BootstrapTable ref={this.props.myref} data={this.props.surveys} pagination={true} striped={true} >
        <TableHeaderColumn dataField="id" hidden={true} isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
        <TableHeaderColumn width="100" dataField="date" dataSort={true}>Date</TableHeaderColumn>
        <TableHeaderColumn dataField="location" dataSort={true}>Location</TableHeaderColumn>
        <TableHeaderColumn width="200" dataAlign="center" dataField="id" dataFormat={this.BuildButtons}>Actions</TableHeaderColumn>
    </BootstrapTable>
  )}
});

/*
*/
var ActiveSurvey = React.createClass({
    handleBtnClick: function(e) {
        this.refs.fieldDay.open();
    },
    getInitialState: function() {
        return {"surveys":[]};
    },  
    componentDidMount: function() {
        var that = this;
        this.serverRequest = $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"field_days?num="+Math.random(), function (result) {
            that.setState({
                surveys: result.data
            });
        })
        .done(function() {
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
        })
        .always(function() {
        });
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render() {
        return ( 
            <Panel heading={"Current Survey Days"} type={"primary"}>
                <button className="btn btn-primary" style={{"marginLeft": "10px"}} onClick={this.handleBtnClick}>Add</button>
                <Table surveys={this.state.surveys} onSelect={this.props.onSelect} />
                <FieldDay ref="fieldDay" />
            </Panel>
        )
    }
})

/*
*/
export default React.createClass({
    getInitialState: function() {
        return {selectedSurvey:""};
    },  
    onSurveySelected: function(survey) {
        this.setState({selectedSurvey:survey});
    },
    render() {
        var path = this.props.location.pathname;
        var segment = path.split('/')[1] || 'root';
        
        return (
            <div>
                {this.state.selectedSurvey ? (
                    <div>
                        <div>
                            <ActiveSurvey onSelect={this.onSurveySelected} />
                        </div>
                        <div>
                            <WorkingSurveyList selectedSurvey={this.state.selectedSurvey} />
                        </div>
                        <div  className="contentPage">
                            {this.props.children}
                        </div>
                    </div>
                    ): // eslint-disable-line  operator-linebreak 
                    <div>
                        <div>
                            <ActiveSurvey onSelect={this.onSurveySelected} />
                        </div>
                        <h3>Please select a survey day to to work on.</h3>
                    </div>    
                }
            </div>
        )
    }
})
