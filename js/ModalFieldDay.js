import React from 'react'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'
import moment from "moment";
import SelectBox from './components/SelectBox'
import config from '../config'
import validator from 'bootstrap-validator';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

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
            url         : config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"field_days?num="+Math.random(),
            data        : formData,
            processData : false,
            contentType : false,
            type: 'POST'
        }).done(function(data){
            that.setState({ showModal: false });
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
            alert("Failed");
        });
    },
    handleChange: function(e) {
        var fieldDayCopy = this.state.fieldDay;
        fieldDayCopy[e.target.name] = e.target.value;
        this.setState(fieldDayCopy);
    },
    handleDate: function(date) {
        var fieldDayCopy = this.state.fieldDay;
        fieldDayCopy.date = date;
        this.setState(fieldDayCopy);
    },
    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
                <Modal.Header>
                    <Modal.Title>Field Day</Modal.Title>
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
                        <FormGroup controlId="description">
                            <ControlLabel controlId="description">Survey description</ControlLabel>
                            <FormControl
                                required
                                type="text"
                                value={this.state.fieldDay.description}
                                placeholder="Survey Description"
                                onChange={this.handleChange}
                                id="description"
                                name="description"
                            />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="location_id">
                            <ControlLabel>Survey location</ControlLabel>
                                <SelectBox id="location_id" onChange={this.handleChange} name="location_id" data={this.state.locations} />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="leaderId">
                            <ControlLabel>Leader</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.fieldDay.location_id}
                                placeholder="Leaders of survey team"
                                onChange={this.onChange}
                            />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
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