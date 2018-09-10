import React from 'react'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'
import moment from "moment";
import SelectBox from './components/SelectBox'
import validator from 'bootstrap-validator';
import Typeahead from 'react-bootstrap-typeahead';
import * as Services from "../data/services";

/* eslint-disable new-cap */

var surveyDay =  React.createClass({
    isLoggedIn: function(){
            return true;
    },
    getInitialState: function() {
        var initialState = {};

        Services.GetLocations(this.setLocation);
        initialState.surveyDay = { "surveyDate": "", "lowTide": "",  "highTide": "", "locationId" : 0, "projectOfficer": "" };
        initialState.leaders = [];
        initialState.renderedSites = [];
        initialState.selectedSitesdata = [];
        initialState.surveyDay.surveyDate = moment().format("YYYY-MM-DD");
        initialState.surveyDay.highTideTime = moment("1970-01-01 00:00");
        initialState.surveyDay.lowTideTime = moment("1970-01-01 00:00");
        initialState.validationState = {"surveyDateState":null,"locationIdState":null,"lowTideState":null,"projectOfficerState":null,"lowTideTimeState":null,"highTideState":null,"highTideTimeState":null};

        return initialState;
    },
    setLocation: function(result) {
        this.state.locations = result;
        this.state.locationsCombo = [];
        var locations = result.map(function (item) {
            return {value: item.id, display: item.locationName};
        });
        //set current location id
        this.state.surveyDay.locationId = locations[0].value;
        this.state.locationsCombo = locations;
        this.getSites(this.state.surveyDay.locationId);
    },
    close: function() {
        this.setState({ showModal: false });
        window.location.reload();
    },
    open: function () {
        this.setState({ showModal: true });
    },
    submit: function (e) {
        e.preventDefault();
        if (this.formValid()) {
            var data = this.state.surveyDay;
            Services.AddSurveyDay(data, this.SaveSelectedSites);
        }
    },
    setSurveyState: function(state, field) {
        var validationState = this.state.validationState;
        validationState[field] = state;
        this.setState({validationState: validationState});
    },
    SaveSelectedSites: function(result) {
        var surveyDayId = result.id;
        this.state.currentSiteList.forEach(function (item) {
            if (typeof item.selected !== 'undefined' && item.selected) {
                //map site to selectedsite model
                var SelectedSite = {};
                SelectedSite.siteId = item.id;
                SelectedSite.siteCode = item.siteCode;
                SelectedSite.surveyDayId = surveyDayId;
                Services.AddSelectedSite(SelectedSite, this.close);
            }
        },this);
    },
    handleChange: function(e) {
        var newSurveyData = this.state.surveyDay;
        newSurveyData[e.target.id] = e.target.value;
        this.setState({surveyDay: newSurveyData});
    },
    handleLeader: function (e) {

    },
    handleLocationChange: function (e) {
        var newSurveyData = this.state.surveyDay;
        newSurveyData[e.target.id] = e.target.options[e.target.selectedIndex].value;
        this.setState({surveyDay: newSurveyData});
        this.getSites(e.target.options[e.target.selectedIndex].value);
    },
    handleLowTime: function(date) {
        var newSurveyData = this.state.surveyDay;
        var d = new Date(parseInt(date, 10)); //?
        var lowTimeTime = moment(d);

        if (lowTimeTime.isValid()) {
            newSurveyData.lowTideTime = lowTimeTime.format("YYYY-MM-DD HH:mm");
            this.setSurveyState(null, 'lowTideTimeState');
            this.setState({surveyDay: newSurveyData});
        } else {
            this.setSurveyState('error', 'lowTideTimeState');
        }
    },
    handleHighTime: function(date) {
        var newSurveyData = this.state.surveyDay;
        var d = new Date(parseInt(date, 10)); //?
        var highTideTime = moment(d);
        if (highTideTime.isValid()) {
            newSurveyData.highTideTime =  highTideTime.format("YYYY-MM-DD HH:mm")
            this.setState({surveyDay: newSurveyData});
            this.setSurveyState(null, 'highTideTimeState');
        } else {
            this.setSurveyState('error', 'highTideTimeState');
        }
    },
    formValid: function() {
        var validationState = this.state.validationState;
        var siteSelected = false;
        this.state.currentSiteList.forEach(function (item) {
            if (item.selected) {
                siteSelected = true;
            }
        });

        if (validationState.locationIdState===null&&
            validationState.lowTideState===null&&
            validationState.lowTideTimeState===null&&
            validationState.highTideState===null&&
            validationState.highTideTimeState===null&&
            validationState.surveyDateState===null&&
            validationState.projectOfficerState===null&&siteSelected) {
            return true;
        }
        if (!siteSelected) {
            alert("Please select a site");
        } else {
            alert("Please fix form validation errors");
        }
        return false;
    },
    handleDate: function(date) {
        var newSurveyData = this.state.surveyDay;
        var d = new Date(parseInt(date, 10)); // ?
        var surveyDate = moment(d); //? ^
        if (surveyDate.isValid()) {
            newSurveyData.surveyDate = surveyDate.format("YYYY-MM-DD");
            this.setState({surveyDay: newSurveyData});
            this.setSurveyState(null, 'surveyDateState');
        } else {
            this.setSurveyState('error', 'surveyDateState');
        }
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
    handleSelectedSites: function (e) {
        //selected sites only
        var currentSiteList = this.state.currentSiteList;
        currentSiteList.forEach(function (item) {
            if (item.id===e.target.value) {
                item.selected = e.target.checked;
            }
        });
        this.setState({currentSiteList: currentSiteList});
    },
    getSites: function (locationId) {
        var sites = [];
        Services.GetSitesByLocation(locationId, this.renderSites);
    },
    renderSites: function(sites) {
        this.state.currentSiteList = sites;
        this.state.renderedSites =  sites.map(function (item) {
            var type = "";
            return <Checkbox inline
                id={type}
                key={item.id}
                value={item.id}
                onChange={this.handleSelectedSites} value={item.id}>{item.siteCode}</Checkbox>;
        },this);
        this.forceUpdate();
    },
    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
                <Modal.Header>
                    <Modal.Title>Survey Day</Modal.Title>
                </Modal.Header>
                <form id="formSurvey" data-toggle="validator" onSubmit={this.submit} role="form">
                <Modal.Body>
                        <FormGroup controlId="surveyDate" validationState={this.state.validationState.surveyDateState}>
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
                        <FormGroup controlId="locationId" validationState={this.state.validationState.locationIdState}>
                            <ControlLabel>Survey location</ControlLabel>
                                <SelectBox id="locationId" onChange={this.handleLocationChange} name="locationId" value={this.state.surveyDay.locationId} data={this.state.locationsCombo} />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="projectOfficer"  validationState={this.state.validationState.projectOfficerState}>
                            <ControlLabel controlId="projectOfficer">Project Officer</ControlLabel>
                                {/*
                                <SelectBox id="projectOfficer" fields={["id", "projectOfficer"]} onChange={this.handleChange} name="leader" data={this.state.leaders} required />
                                */}
                            <FormControl.Feedback />
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                        <div className="row">
                            <div className="col-md-6">
                                <FormGroup controlId="lowTide" validationState={this.state.validationState.lowTideState}>
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
                                <FormGroup controlId="lowTideTime" validationState={this.state.validationState.lowTideTimeState}>
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
                                <FormGroup controlId="highTide" validationState={this.state.validationState.highTideState}>
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
                                <FormGroup controlId="highTideTime" validationState={this.state.validationState.highTideTimeState}>
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
    },
})

export default  surveyDay;
