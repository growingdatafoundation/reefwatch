import React from 'react';
import validator from 'bootstrap-validator';
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from "moment";
import config from '../config'
import Typeahead from 'react-bootstrap-typeahead';
import CloudCover from './components/CloudCover';
import SelectBox from './components/SelectBox';
import * as Data from "../data/data"

var Observation = React.createClass({
    getInitialState: function() {
        var initialState = {};

        /*
        this.serverRequest = $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"users?num="+Math.random(), $( "#testform" ).serialize(), function (result) {
            initialState.volunteers = []; 
            result.data.map(function (item) {
                initialState.volunteers.push({value: item.id, display: item.description});
                return initialState;
            });
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
            alert("Fatal Error");
        });
        */


        initialState.time = moment("1970-01-01 00:00");
        initialState.volunteers = [];
        initialState.volunteers.push({id: 1, volunteer: "Jarkko Oikarinen"});
        initialState.volunteers.push({id: 2, volunteer: "David Wise"});
        initialState.volunteers.push({id: 3, volunteer: "Alan Turing"});
        initialState.volunteers.push({id: 4, volunteer: "Bob Kahn"});
        initialState.volunteers.push({id: 5, volunteer: "Vint Cerf"});
        initialState.volunteers.push({id: 6, volunteer: "Ralph Baer"});
        initialState.volunteers.push({id: 7, volunteer: "Ray Tomlinson"});
        initialState.volunteers.push({id: 8, volunteer: "Dennis Ritchie"});
    
        initialState.beaufordWindScale = Data.loadBeaufordWindScale();
        initialState.seaState = Data.loadSeaState();
        initialState.rainfall = Data.loadRainfall();
        initialState.windDirections = Data.loadWindDirections();
        
        initialState.cloudCover = 0;

        initialState.observation = {};
        
        return initialState;
    },
    handleTime: function (timeValue) {
        var observation = this.state.observation;
        observation.time = moment(parseInt(timeValue)).format('HH:mm'); // eslint-disable-line radix
        this.setState(observation);
    },
    handleChange: function(e) {
        var observation = this.state.observation;
        observation[e.target.name] = e.target.value;
        this.setState(observation);
    },
    submit: function (e) {
        e.preventDefault();
        var state = this.state;
        var formData = new FormData();
        for ( var key in state.observation ) {
            formData.append(key, state.observation[key]);
        }
        var that = this;
        $.ajax({
            url         : config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"observation",
            data        : formData,
            processData : false,
            contentType: false,
            type: 'POST'
        }).done(function(data){
        })
            .fail(function(jqXHR, textStatus, errorThrown) { 
            alert("Failed");
        });
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
                    dateTime={this.state.time}
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
                <FormGroup controlId="beaufordWindScale">
                    <ControlLabel controlId="beaufordWindScale">Beauford Wind Scale (1-5)</ControlLabel>
                        <SelectBox id="beaufordWindScale" onChange={this.handleChange} name="beaufordWindScale" data={this.state.beaufordWindScale} />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="seaState">
                    <ControlLabel controlId="seaState">Sea State</ControlLabel>
                        <SelectBox id="seaState" onChange={this.handleChange} name="seaState" data={this.state.seaState} />
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
                <Button bsStyle="success" type="submit">Save</Button>
            </form>
        </div>
    );
  }
})

export default Observation;
