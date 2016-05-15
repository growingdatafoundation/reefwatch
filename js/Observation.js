import React from 'react';
import validator from 'bootstrap-validator';
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from "moment";
import Typeahead from 'react-bootstrap-typeahead';
import CloudCover from './components/CloudCover';

var observation = React.createClass({
  getInitialState: function() {
      var initialState = {};
      /*
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
      */
      
      
      initialState.volunteers = [];
      initialState.volunteers.push({id: 1, volunteer: "Jarkko Oikarinen"});
      initialState.volunteers.push({id: 2, volunteer: "David Wise"});
      initialState.volunteers.push({id: 3, volunteer: "Alan Turing"});
      initialState.volunteers.push({id: 4, volunteer: "Bob Kahn"});
      initialState.volunteers.push({id: 5, volunteer: "Vint Cerf"});
      initialState.volunteers.push({id: 6, volunteer: "Ralph Baer"});
      initialState.volunteers.push({id: 7, volunteer: "Ray Tomlinson"});
      initialState.volunteers.push({id: 8, volunteer: "Dennis Ritchie"});
      
      initialState.windDirections = [];
      initialState.windDirections.push({id: 1, windDireciton: "North"});
      initialState.windDirections.push({id: 2, windDireciton: "South"});
      initialState.windDirections.push({id: 3, windDireciton: "West"});
      initialState.windDirections.push({id: 4, windDireciton: "East"});
      initialState.windDirections.push({id: 5, windDireciton: "North West"});
      initialState.windDirections.push({id: 6, windDireciton: "North East"});
      initialState.windDirections.push({id: 7, windDireciton: "South West"});
      initialState.windDirections.push({id: 8, windDireciton: "South East"});
      
      return initialState;
  },
  handleTime: function (timeValue) {
    alert(timeValue);  
  },
  submit: function(data) {
    // Reset fields back to default values
    this.refs.myFormRef.reset();
  },
  render() {
    return (
      <form id="formObservation" data-toggle="validator" onSubmit={this.submit} role="form">
        <FormGroup controlId="time">
          <ControlLabel controlId="time">Observation Time</ControlLabel>
          <DateTimeField
              mode="time"
              id="time"
              inputProps={{required:"required", name:"time"}}
              onChange={this.handleTime}
          />
          <FormControl.Feedback />
          <HelpBlock></HelpBlock>
        </FormGroup>
        <FormGroup controlId="otherLocation">
            <ControlLabel controlId="otherLocation">Other Location</ControlLabel>
            <FormControl
                required
                type="text"
                value={this.state.otherLocation}
                placeholder=""
                onChange={this.handleChange}
                id="otherLocation"
                name="otherLocation"
            />
            <FormControl.Feedback />
            <HelpBlock></HelpBlock>
        </FormGroup>
        <FormGroup controlId="volunteers">
            <ControlLabel controlId="volunteers">Volunteers</ControlLabel>
            <Typeahead
              required
              labelKey="volunteer"
              onChange={this.handleChange}
              options={this.state.volunteers}
              id="volunteers"
              allowNew={true}
              multiple={true}
            />
            <FormControl.Feedback />
            <HelpBlock></HelpBlock>
        </FormGroup>
        <FormGroup controlId="weatherComment">
            <ControlLabel controlId="weatherComment">Weather Comment </ControlLabel>
            <FormControl
                required
                type="text"
                value={this.state.weatherComment}
                placeholder="weatherComment"
                onChange={this.handleChange}
                id="weatherComment"
                name="weatherComment"
            />
            <FormControl.Feedback />
            <HelpBlock></HelpBlock>
        </FormGroup>
        <FormGroup controlId="windDirection">
            <ControlLabel controlId="windDirection">Wind Direction</ControlLabel>
            <Typeahead
              required
              labelKey="windDireciton"
              onChange={this.handleChange}
              options={this.state.windDirections}
              id="windDirection"
              allowNew={false}
              multiple={false}
            />
            <FormControl.Feedback />
            <HelpBlock></HelpBlock>
        </FormGroup>
        <FormGroup controlId="cloudCover">
            <ControlLabel controlId="cloudCover">Cloud Cover</ControlLabel>
            <CloudCover
              id="cloudCover"
              required
            />
            <FormControl.Feedback />
            <HelpBlock></HelpBlock>
        </FormGroup>
      </form>
    );
  }
})

export default observation;
