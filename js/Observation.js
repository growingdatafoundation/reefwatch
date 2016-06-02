import React from 'react';
import validator from 'bootstrap-validator';
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from "moment";
import Typeahead from 'react-bootstrap-typeahead';
import CloudCover from './components/CloudCover';
import SelectBox from './components/SelectBox';

var Observation = React.createClass({
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
 
      initialState.windForce = [];
      initialState.windForce.push({value: 1, display: "Light air"});
      initialState.windForce.push({value: 2, display: "Gentle breeze"});
      initialState.windForce.push({value: 3, display: "Moderate breeze"});
      initialState.windForce.push({value: 4, display: "Fresh breeze"});
      initialState.windForce.push({value: 5, display: "Strong Breeze"});
      
      initialState.seaState = [];
      initialState.seaState.push({value: 1, display: "Calm"});
      initialState.seaState.push({value: 2, display: "Smooth"});
      initialState.seaState.push({value: 3, display: "Slight"});
      initialState.seaState.push({value: 4, display: "Moderate"});
      initialState.seaState.push({value: 5, display: "Rough"});
      
      initialState.rainfall = [];
      initialState.rainfall.push({value: 1, display: "Nil"});
      initialState.rainfall.push({value: 2, display: "Light"});
      initialState.rainfall.push({value: 3, display: "Moderate"});
      initialState.rainfall.push({value: 4, display: "Heavy"});
      
      initialState.windDirections = [];
      initialState.windDirections.push({value: 1, display: "North"});
      initialState.windDirections.push({value: 2, display: "South"});
      initialState.windDirections.push({value: 3, display: "West"});
      initialState.windDirections.push({value: 4, display: "East"});
      initialState.windDirections.push({value: 5, display: "North West"});
      initialState.windDirections.push({value: 6, display: "North East"});
      initialState.windDirections.push({value: 7, display: "South West"});
      initialState.windDirections.push({value: 8, display: "South East"});
      
      initialState.cloudCover = 0;
      
      return initialState;
  },
  handleTime: function (timeValue) {
  },
  handleChange: function (e) {
      
  },
  submit: function(data) {
    // Reset fields back to default values
    this.refs.myFormRef.reset();
  },
  render() {
    return (
        <div className="container">
            <h2>Observation</h2>
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
                <FormGroup controlId="seaState">
                    <ControlLabel controlId="seaState">Sea State</ControlLabel>
                        <SelectBox id="seaState" onChange={this.handleChange} name="seaState" data={this.state.seaState} />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="windForce">
                    <ControlLabel controlId="windForce">Wind Force</ControlLabel>
                        <SelectBox id="windForce" onChange={this.handleChange} name="windForce" data={this.state.windForce} />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="windDirection">
                    <ControlLabel controlId="windDirection">Wind Direction</ControlLabel>
                        <SelectBox id="windDirection" onChange={this.handleChange} name="windDirection" data={this.state.windDirections} />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="rainfall">
                    <ControlLabel controlId="rainfall">Rainfall</ControlLabel>
                        <SelectBox id="rainfall" onChange={this.handleChange} name="rainfall" data={this.state.rainfall} />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="cloudCover">
                    <ControlLabel controlId="cloudCover">Cloud Cover</ControlLabel>
                    <CloudCover
                    id="cloudCover"
                    cloudCoverValue={this.state.cloudCover}
                    required
                    />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="">
                    <ControlLabel controlId="exceptionalWeatherConditions">Recent Exceptional Weather Conditions</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="textarea" value={this.state.exceptionalWeatherConditions}
                        placeholder="Any recent tidal, weather, or other unusual events (e.g. hevy rain shortly before survey, storm, heatwave, wind held tide higher than expected)"
                        onChange={this.handleChange} name="exceptionalWeatherConditions" />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
            </form>
        </div>
    );
  }
})

export default Observation;
