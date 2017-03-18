import React from 'react'
import config from "../config"
import SurveyDay from "./ModalSurveyDay"
import WorkingSurveyList from "./components/WorkingSurveyList"
import Panel from "./components/Panel"
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import moment from "moment";
import * as services from "../data/services"

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
    $.publish("selectSurvey", {location: row.location.locationName, date: moment(row.surveyDate).format("DD-MM-YYYY")});
    this.props.onSelect(row);
  },
  BuildButtons: function(cell, row, enumObject){
    return <div className="btn-toolbar">
                <button onClick={this.handleComplete.bind(this, row)} className="btn btn-success btn-sm">Completed</button>
                <button onClick={this.handleSelect.bind(this, row)} className="btn btn-info btn-sm">Select</button>
           </div>
 },
 SurveyDate: function(cell, row) {
     return moment(cell).format("DD-MM-YYYY");
 },
 LocationName: function(cell, row) {
     return cell.locationName;
 },
 render() {
    return (
    <BootstrapTable ref={this.props.myref} data={this.props.surveys} pagination={true} striped={true} >
        <TableHeaderColumn dataField="id" hidden={true} isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
        <TableHeaderColumn width="100" dataField="surveyDate" dataFormat={this.SurveyDate} dataSort={true}>Date</TableHeaderColumn>
        <TableHeaderColumn dataField='location' dataFormat={this.LocationName} dataSort={true}>Location</TableHeaderColumn>
        <TableHeaderColumn width="200" dataAlign="center" dataField="id" dataFormat={this.BuildButtons}>Actions</TableHeaderColumn>
    </BootstrapTable>
  )}
});

/*
*/
var ActiveSurvey = React.createClass({
    handleBtnClick: function(e) {
        this.refs.surveyDay.open();
    },
    getInitialState: function() {
        return {"surveys":[]};
    },
    componentDidMount: function() {

        services.getSurveyDaysWithLocations((surveys) => this.setState({
          surveys
        }));
    },
    render() {

        return (
            <Panel heading={"Current Survey Days"} type={"primary"}>
                <button className="btn btn-primary" style={{marginBottom: "10px"}} onClick={this.handleBtnClick}>Add</button>
                <Table surveys={this.state.surveys} onSelect={this.props.onSelect} />
                <SurveyDay ref="surveyDay" />
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
