import React from 'react'
import { Modal, Button, Form, FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'
import SelectBox from './components/SelectBox'
import config from '../config'

var fieldDay =  React.createClass({
  getInitialState: function() {
    var initialState = {};
    this.serverRequest = $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"locations?num="+Math.random(), function (result) {
        initialState.locations = []; 
        result.data.map(function (item) {
            initialState.locations.push({value: item.location_code, display: item.description});
            return initialState;
        });
    })
    .done(function() {
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
    })
    .always(function() {
    });
    
    initialState.fieldDay = [];
    
    return initialState;
  },
  close: function() {
    this.setState({ showModal: false });
  },
  open: function () {
    this.setState({ showModal: true });
  },
  add: function () {
      alert("Add Code Here")
  },
  getValidationState: function (e) {
    return true;   
  },
  handleChange: function (e) {
    return true;   
  },
  render() {
    return (
        <form>
            <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
                <Modal.Header>
                    <Modal.Title>Field Day</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="surveyDate"
                            validationState={this.getValidationState()}>
                        <ControlLabel>Survey Date</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.fieldDay.surveyDate}
                            placeholder="Date survey was undertaken"
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="surveyDescription"
                            validationState={this.getValidationState()}>
                        <ControlLabel>Survey description</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.fieldDay.description}
                            placeholder="Survey Description"
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="surveyLocation"
                            validationState={this.getValidationState()}>
                        <ControlLabel>Survey Location</ControlLabel>
                            <SelectBox data={this.state.locations} />
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="leaderId"
                            validationState={this.getValidationState()}>
                        <ControlLabel>Location Survey took place</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.fieldDay.location_id}
                            placeholder="Leaders Name"
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="sites"
                            validationState={this.getValidationState()}>
                        <ControlLabel>Sites</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.fieldDay.sites}
                            placeholder="Sites surveyed"
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={this.add}>Add</Button>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        </form>
    )
  }
})

export default  fieldDay;