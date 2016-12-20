import React from 'react'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'
import moment from "moment";
import SelectBox from './components/SelectBox'
import config from '../config'
import validator from 'bootstrap-validator';
import Typeahead from 'react-bootstrap-typeahead';


var surveyDay =  React.createClass({
    getInitialState: function() {
        var initialState = {};
        this.serverRequest = $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/locations", $( "#testform" ).serialize(), function (result) {
            initialState.locations = []; 
            result.map(function (item) {
                initialState.locations.push({value: item.id, display: item.locationName});
                return initialState;
            });
            initialState.locationId = initialState.locations[0].value;
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
        })
        initialState.surveyDay = { "surveyDate": "","lower": false, "middle": false, "upper": false, "lowTideTime": "",  "highTideTime": "", "locationId" : 0, "projectOfficer": "" };
        initialState.leaders = [];
        initialState.surveyDay.surveyDate = moment().format("YYYY-MM-DD");
        initialState.surveyDay.highTideTime = moment("1970-01-01 00:00");
        initialState.surveyDay.lowTideTime = moment("1970-01-01 00:00");

        return initialState;
    },
    close: function() {
        this.setState({ showModal: false });
    },
    open: function () {
        this.setState({ showModal: true });
    },
    submit: function (e) {
        e.preventDefault();
        var data = this.state.surveyDay;
        var that = this;
        $.ajax({
            url         : config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/surveyDays",
            data        : JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            type: 'POST'
        }).done(function(data){
            that.setState({ showModal: false });
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
            alert("Failed");
        });
    },
    handleChange: function(e) {
        var newSurveyData = this.state.surveyDay;
        newSurveyData[e.target.id] = e.target.value;
        this.setState({surveyDay: newSurveyData});
    },
    handleLeader: function (e) {
        
    },
    handleLowTime: function(date) {
        var newSurveyData = this.state.surveyDay;
        var d = new Date(parseInt(date));
        newSurveyData.lowTideTime = moment(d).format("YYYY-MM-DD HH:mm");
        this.setState({surveyDay: newSurveyData});
    },
    handleHighTime: function(date) {
        var newSurveyData = this.state.surveyDay;
        var d = new Date(parseInt(date));
        newSurveyData.highTideTime = moment(d).format("YYYY-MM-DD HH:mm");
        this.setState({surveyDay: newSurveyData});
    },
    handleDate: function(date) {
        var newSurveyData = this.state.surveyDay;
        var d = new Date(parseInt(date));
        newSurveyData.surveyDate = moment(d).format("YYYY-MM-DD");
        this.setState({surveyDay: newSurveyData});
    },
    handleTideInput: function (e) {
        var value = $(e.target).val().replace(/[^0-9\.]/g,''); // eslint-disable-line newline-per-chained-call
        $(e.target).val(value);
        if ((event.which !== 46 || $(this).val().indexOf('.') !== -1) && (event.which < 48 || event.which > 57)) { // eslint-disable-line newline-per-chained-call
            event.preventDefault();
        }
        var newSurveyData = this.state.surveyDay;
        newSurveyData[e.target.id] = value;
        this.setState({surveyDay: newSurveyData});
    },
    handleSelectChange: function (e) {
        var newSurveyData = this.state.surveyDay;
        newSurveyData[e.target.id] = e.target.options[e.target.selectedIndex].value;
        this.setState({surveyDay: newSurveyData});
    },
    handleCheckbox: function (e) {
        var newSurveyData = this.state.surveyDay;
        newSurveyData[e.target.id] = e.target.checked;
        this.setState({surveyDay: newSurveyData});
    },
    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
                <Modal.Header>
                    <Modal.Title>Survey Day</Modal.Title>
                </Modal.Header>
                <form id="formSurvey" data-toggle="validator" onSubmit={this.submit} role="form">
                <Modal.Body>
                        <FormGroup controlId="surveyDate">
                            <ControlLabel controlId="surveyDate">Survey date</ControlLabel>
                            <DateTimeField
                                date={this.state.surveyDate}
                                mode="date"
                                id="surveyDate"
                                inputFormat="DD-MM-YYYY"
                                inputProps={{required:"required"}}
                                onChange={this.handleDate}
                            />
                            <FormControl.Feedback />
                            <HelpBlock>This should be the date the survey was completed. Its important to remember that surveys must be completed on the same day for a single location.</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="locationId">
                            <ControlLabel>Survey location</ControlLabel>
                                <SelectBox id="locationId" onChange={this.handleSelectChange} name="locationId" value={this.state.surveyDay.locationId} data={this.state.locations} />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="projectOfficer">
                            <ControlLabel controlId="projectOfficer">Project Officer</ControlLabel>
                                {/*
                                <SelectBox id="projectOfficer" fields={["id", "projectOfficer"]} onChange={this.handleChange} name="leader" data={this.state.leaders} required />
                                */}
                            <FormControl.Feedback />
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                        <div className="row">
                            <div className="col-md-6">
                                <FormGroup controlId="lowTide">
                                    <ControlLabel>Low Tide</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.surveyDay.lowTide}
                                        placeholder="Height of low tide (m)"
                                        inputProps={{name:"lowTide"}}
                                        onChange={this.handleTideInput}
                                        defaultValue={0}
                                        required
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock>Height of low tide (m)</HelpBlock>
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup controlId="lowTideTime">
                                    <ControlLabel>Low Tide Time</ControlLabel>
                                    <DateTimeField
                                        mode="time"
                                        id="lowTideTime"
                                        inputProps={{required:"required", name:"lowTideTime"}}
                                        onChange={this.handleLowTime}
                                        date={this.state.lowTideTime}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock>Time of low tide</HelpBlock>
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup controlId="highTide">
                                    <ControlLabel>High Tide</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.surveyDay.highTide}
                                        defaultValue={0}
                                        inputProps={{name:"highTide"}}
                                        placeholder="Height of high tide (m)"
                                        onChange={this.handleTideInput}
                                        required
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock>Height of high tide (m)</HelpBlock>
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup controlId="highTideTime">
                                    <ControlLabel>High Tide Time</ControlLabel>
                                    <DateTimeField
                                        mode="time"
                                        id="highTideTime"
                                        date={this.state.highTideTime}
                                        inputProps={{required:"required", name:"highTideTime"}}
                                        onChange={this.handleHighTime}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock>Time of last high tide</HelpBlock>
                                </FormGroup>
                            </div>
                        </div>
                        <FormGroup controlId="sites">
                            <ControlLabel>Sites surveyed</ControlLabel><br />
                            <Checkbox inline
                                id="lower"
                                onChange={this.handleCheckbox}>Lower</Checkbox>
                            <Checkbox inline
                                id="middle"
                                onChange={this.handleCheckbox}>Middle</Checkbox>
                            <Checkbox inline
                                id="upper"
                                onChange={this.handleCheckbox}>Upper</Checkbox>
                            <FormControl.Feedback />
                        </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" type="submit">Add</Button>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
                </form>
            </Modal>
        )
    }
})

export default  surveyDay;