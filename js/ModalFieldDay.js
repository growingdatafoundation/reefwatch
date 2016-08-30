import React from 'react'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'
import moment from "moment";
import SelectBox from './components/SelectBox'
import config from '../config'
import validator from 'bootstrap-validator';
import Typeahead from 'react-bootstrap-typeahead';


var fieldDay =  React.createClass({
    getInitialState: function() {
        var initialState = {};
        this.serverRequest = $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"locations?num="+Math.random(), $( "#testform" ).serialize(), function (result) {
            initialState.locations = []; 
            result.data.map(function (item) {
                initialState.locations.push({value: item.id, display: item.description});
                return initialState;
            });
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
        })
        initialState.fieldDay = {};
        initialState.leaders = [];

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
        var state = this.state;
        var formData = new FormData();
        for ( var key in state.fieldDay ) {
            formData.append(key, state.fieldDay[key]);
        }
        var that = this;
        $.ajax({
            url         : config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"field_days",
            data        : formData,
            processData : false,
            contentType: false,
            type: 'POST'
        }).done(function(data){
            that.setState({ showModal: false });
            that.saveTides(data.getResponseHeader("id"));
            that.saveSites(data.getResponseHeader("id"));
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
            alert("Failed");
        });
    },
    saveTides: function (id) {
        /*
        alert(id)
        var state = this.state;
        var that = this;
        $.ajax({
            url         : config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"field_days/"+id+"/tides",
            data        : formData,
            processData : false,
            contentType: false,
            type: 'POST'
        }).done(function(data){
            that.setState({ showModal: false });
            that.saveTides(data);
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
            alert("Failed");
        });
        */
    },
    saveSites: function (id) {
        /*
        alert(id)
        var state = this.state;
        var that = this;
        $.ajax({
            url         : config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"field_days/"+id+"/sites",
            data        : formData,
            processData : false,
            contentType: false,
            type: 'POST'
        }).done(function(data){
            that.setState({ showModal: false });
            that.saveTides(data);
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
            alert("Failed");
        });
        */
    },
    handleChange: function(e) {
        var fieldDayCopy = this.state.fieldDay;
        fieldDayCopy[e.target.name] = e.target.value;
        this.setState(fieldDayCopy);
    },
    handleLeader: function (e) {
        
    },
    handleDate: function(date) {
        var fieldDayCopy = this.state.fieldDay;
        fieldDayCopy.date = date;
        this.setState(fieldDayCopy);
    },
    handleTideInput: function (e) {
        var value = $(e.target).val().replace(/[^0-9\.]/g,''); // eslint-disable-line newline-per-chained-call
        $(e.target).val(value);
        if ((event.which !== 46 || $(this).val().indexOf('.') !== -1) && (event.which < 48 || event.which > 57)) { // eslint-disable-line newline-per-chained-call
            event.preventDefault();
        }
    },
    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
                <Modal.Header>
                    <Modal.Title>Survey Day</Modal.Title>
                </Modal.Header>
                <form id="formSurvey" data-toggle="validator" onSubmit={this.submit} role="form">
                <Modal.Body>
                        <FormGroup controlId="date">
                            <ControlLabel controlId="date">Survey date</ControlLabel>
                            <DateTimeField
                                dateTime="2016-01-01"
                                viewMode="date"
                                id="date"
                                inputFormat="DD/MM/YYYY"
                                format="YYYY-MM-DD"
                                inputProps={{required:"required", name:"date"}}
                                onChange={this.handleDate}
                            />
                            <FormControl.Feedback />
                            <HelpBlock>This should be the date the survey was completed. Its important to remember that surveys must be completed on the same day for a single location.</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="location_id">
                            <ControlLabel>Survey location</ControlLabel>
                                <SelectBox id="location_id" onChange={this.handleChange} name="location_id" data={this.state.locations} />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="leader">
                            <ControlLabel controlId="leader">Project Officer</ControlLabel>
                                <SelectBox id="leader" fields={["id", "leader"]} onChange={this.handleChange} name="leader" data={this.state.leaders} />
                            <FormControl.Feedback />
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                        <div className="row">
                            <div className="col-md-6">
                                <FormGroup controlId="low_tide">
                                    <ControlLabel>Low Tide</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.fieldDay.lowTide}
                                        placeholder="Height of low tide (m)"
                                        onChange={this.onChange}
                                        onBlur={this.handleTideInput}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock>Height of low tide (m)</HelpBlock>
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup controlId="low_tide">
                                    <ControlLabel>Low Tide Time</ControlLabel>
                                    <DateTimeField
                                        mode="time"
                                        id="low_tide_time"
                                        inputProps={{required:"required", name:"low_tide_time"}}
                                        onChange={this.handleDate}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock>Time of low tide</HelpBlock>
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup controlId="high_tide">
                                    <ControlLabel>High Tide</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.fieldDay.highTide}
                                        placeholder="Height of high tide (m)"
                                        onChange={this.onChange}
                                        onBlur={this.handleTideInput}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock>Height of high tide (m)</HelpBlock>
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup controlId="high_tide_time">
                                    <ControlLabel>High Tide Time</ControlLabel>
                                    <DateTimeField
                                        mode="time"
                                        id="high_tide_time"
                                        inputProps={{required:"required", name:"high_tide_time"}}
                                        onChange={this.handleDate}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock>Time of last high tide</HelpBlock>
                                </FormGroup>
                            </div>
                        </div>
                        <FormGroup controlId="sites">
                            <ControlLabel>Sites surveyed</ControlLabel><br />
                            <Checkbox inline
                                value="L"
                                onChange={this.onChange}>Lower</Checkbox>
                            <Checkbox inline
                                value="M"
                                onChange={this.onChange}>Middle</Checkbox>
                            <Checkbox inline
                                value="H"
                                onChange={this.onChange}>High</Checkbox>
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
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

export default  fieldDay;