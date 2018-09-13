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
        initialState.surveyDay.surveyDate = null;
        initialState.surveyDay.highTideTime = null;
        initialState.surveyDay.lowTideTime = null;
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

    formValid: function() {
        var validationState = this.state.validationState;
        var siteSelected = false;
        this.state.currentSiteList.forEach(function (item) {
            if (item.selected) {
                siteSelected = true;
            }
        });

        // TODO refactor
        if (validationState.locationIdState === null &&
            validationState.lowTideState === null &&
            validationState.lowTideTimeState === null &&
            validationState.highTideState === null &&
            validationState.highTideTimeState === null &&
            validationState.surveyDateState === null &&
            validationState.projectOfficerState === null && siteSelected) {
            return true;
        }
        if (!siteSelected) {
            alert("Please select a site");
        } else {
            alert("Please fix form validation errors");
        }
        return false;
    },

    handleDate: function(timeValue, property) { //! js timestamp
        const d = new Date();
        d.setTime(timeValue);

        const _surveyDay = this.state.surveyDay;

        _surveyDay[property] = d.toISOString();
        this.setState({
            surveyDay: _surveyDay,
        });
        this.setSurveyState(null, 'surveyDateState');
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
            if (item.id === e.target.value) {
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

        const surveyDate = (this.state.surveyDay.surveyDate) ? moment(this.state.surveyDay.surveyDate).format('x') : moment().startOf('day').format('x'); // eslint-disable-line newline-per-chained-call
        const lowTideTime = (this.state.surveyDay.lowTideTime) ? moment(this.state.surveyDay.lowTideTime).format('x') : surveyDate;
        const highTideTime = (this.state.surveyDay.highTideTime) ? moment(this.state.surveyDay.highTideTime).format('x') : surveyDate;

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
                                mode="date"
                                dateTime={ surveyDate }
                                inputFormat="DD/MM/YY h:mm A"

                                id="surveyDate"
                                inputProps={{required:'required', name:'surveyDate'}}
                                onChange={ (timestamp) => this.handleDate(timestamp, 'surveyDate') }
                            />
                            <FormControl.Feedback />
                            <HelpBlock>This should be the date the survey was completed. Its important to remember that surveys must be completed on the same day for a single location.</HelpBlock>
                        </FormGroup>

                        { (this.state.surveyDay.surveyDate) &&
                            <section>
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
                                                dateTime={ lowTideTime }
                                                inputFormat="DD/MM/YY h:mm A"

                                                id="lowTideTime"
                                                inputProps={{required:'required', name:'lowTideTime'}}
                                                onChange={ (timestamp) => this.handleDate(timestamp, 'lowTideTime') }
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
                                                dateTime={ highTideTime }
                                                inputFormat="DD/MM/YY h:mm A"

                                                id="highTideTime"
                                                inputProps={{required:'required', name:'highTideTime'}}
                                                onChange={ (timestamp) => this.handleDate(timestamp, 'highTideTime') }
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

                            </section>
                        }
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
