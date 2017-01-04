import React from 'react'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'
import moment from "moment";
import SelectBox from './components/SelectBox'
import config from '../config'
import validator from 'bootstrap-validator';
import Typeahead from 'react-bootstrap-typeahead';
import * as Services from "../data/services";


var surveyDay =  React.createClass({
    getInitialState: function() {
        var initialState = {};

        Services.GetLocations(this.setLocation);
        initialState.surveyDay = { "surveyDate": "","lower": false, "middle": false, "upper": false, "lowTideTime": "",  "highTideTime": "", "locationId" : 0, "projectOfficer": "" };
        initialState.leaders = [];
        initialState.renderedSites = [];
        initialState.surveyDay.surveyDate = moment().format("YYYY-MM-DD");
        initialState.surveyDay.highTideTime = moment("1970-01-01 00:00");
        initialState.surveyDay.lowTideTime = moment("1970-01-01 00:00");

        return initialState;
    },
    setLocation: function(result) {
        this.state.locations = result;
        this.state.locationsCombo = [];
        this.state.locationsCombo = result.map(function (item) {
            return {value: item.id, display: item.locationName};
        });
        //set current location id
        this.state.locationId = this.state.locationsCombo[0].value;
        this.getSites(this.state.locationId);
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
        Services.AddSurveyDay(data, () => this.setState({ showModal: false }));
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
    getSites: function (locationId) {
        var sites = [];
        Services.GetSitesByLocation(locationId, this.renderSites);
    },
    renderSites: function(sites) {
        this.state.renderedSites =  sites.map(function (item) {
            var type = "";
            switch((item.siteCode.substring(2,3))) {
                case "L":
                    type = "lower";
                    break;
                case "M":
                    type = "middle";
                    break;
                case "U":
                    type = "upper";
                    break;
            }
            return <Checkbox inline
                id={type}
                value={item.id}
                onChange={this.handleCheckbox}>{item.siteCode}</Checkbox>;
        },this);
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
                                <SelectBox id="locationId" onChange={this.handleSelectChange} name="locationId" value={this.state.surveyDay.locationId} data={this.state.locationsCombo} />
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
                            <div>{this.state.renderedSites}</div>
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