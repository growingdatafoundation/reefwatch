import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Update from 'react-addons-update'



/*
Get Survey Data
*/

const selectRowProp = {
  mode: 'radio',
  clickToSelect: true  // enable click to select
};


/*

*/
var Table = React.createClass({
  handleComplete: function (id) {
    alert(id);  
  },
  BuildButtons: function(cell, row, enumObject){
    return <div><button onClick={this.handleComplete.bind(this, cell)} className="success">Complete</button></div>
 },
 render() {
    return (
    <BootstrapTable ref={this.props.myref} data={this.props.surveys} pagination={true}>
        <TableHeaderColumn dataField="_id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="surveyLeader" dataSort={true}>Survey Name</TableHeaderColumn>
        <TableHeaderColumn dataField="site" dataSort={true} dataFormat={priceFormatter}>Leader</TableHeaderColumn>
        <TableHeaderColumn dataField="_id" dataFormat={this.BuildButtons}>Actions</TableHeaderColumn>
    </BootstrapTable>
  )}
});

/* 

*/
var Panel = React.createClass({
    render() {
        return (<div className={"panel panel-"+this.props.type}>
                    <div className="panel-heading">{this.props.heading}</div>
                    <div className="panel-body">{this.props.children}</div>
                </div>)
    }
})


var CompleteSurvey = React.createClass({
    getInitialState: function() {
        return {"surveys":[ {"_id":"John", "surveyLeader":"Doe", "site":"site one"}]};
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
        return ( 
            <Panel heading={"Completed Field Days"} type={"info"}>
                <button onClick={this.handleBtnClick}>Add</button>
                <Table surveys={this.state.surveys} />
            </Panel>
        )
    }
})




var ActiveSurvey = React.createClass({
    handleBtnClick: function(e) {
        /* Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: {"site": "1" },
            url: '/api/surveys',
            dataType: 'JSON'
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                this.setState({"surveys":[ {"_id":"Nathan", "surveyLeader":"Hill", "site":"site one"}]});
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
        */
        var currentState = this.state;
        currentState.surveys.push({"_id":"Nathan", "surveyLeader":"Hill", "site":"site one"})
        this.setState(currentState);
    },
    getInitialState: function() {
        return {"surveys":[ {"_id":"John", "surveyLeader":"Doe", "site":"site one"}]};
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
        return ( 
            <Panel heading={"Current Field Days"} type={"primary"}>
                <button onClick={this.handleBtnClick}>Add</button>
                <Table surveys={this.state.surveys} />
            </Panel>
        )
    }
})

function priceFormatter(cell, row){
  return cell;
}


/*

*/
export default React.createClass({
  render() {
    return (<div>
                <hr />
                <ActiveSurvey />
                <hr />
                <CompleteSurvey />
            </div>)
  }
})
