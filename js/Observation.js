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
import * as Services from "../data/services";

var Observation = React.createClass({
    getInitialState: function() {
        if(this.props.params.observationId) {
            //need to redirect to error page
        }
        var initialState = {};
        initialState.time = moment("1970-01-01 00:00");

        initialState.observation = {};
        alert(this.props.params.observationId)
        if(this.props.params.observationId) {
            Services.GetObservation(this.props.params.observationId, result => this.setState({"observation": result}));
        }
        
        initialState.volunteers = [];
        Services.GetReefWatchVolunteers((result) => {
           this.setState({volunteers: result});
        });
    
        initialState.beaufordWindScale = Data.loadBeaufordWindScale();
        initialState.seaState = Data.loadSeaState();
        initialState.rainfall = Data.loadRainfall();
        initialState.windDirections = Data.loadWindDirections();
        initialState.validationState =   {
            "observationTimeState": null,
            "otherLocationState": null,
            "weatherCommentState": null,
            "recentExceptionalWeatherState": null,
            "rainfallIdState": null,
            "volunteersState": null,
            "beaufordWindScaleIdState": null,
            "cloudCoverIdState": null,
            "exceptionalWeatherConditionsState": null
        };
        
        initialState.cloudCover = 0;
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
    handleVolunteersChange: function(selectedItems, e) {
        Services.GetVolunteers(this.state.observation.id, function (result) {
            if (result) {
                result.foreach(function (item) {
                }, this);
            }
        })
    },
    submit: function (e) {
        e.preventDefault();
        Services.SaveObservation(this.state.observation.id, this.state.observation, function(result) {
            alert(result);
        }); 
    },
    render() {
    return (
        <div className="container">
            <h2>Observation</h2>
            <form id="formObservation" data-toggle="validator" onSubmit={this.submit} role="form">
                <FormGroup controlId="time" validationState={this.state.validationState['observationTimeState']}>
                <ControlLabel controlId="time">Observation Time</ControlLabel>
                <DateTimeField
                    mode="time"
                    id="time"
                    date={this.state.observation.observationTime}
                    inputProps={{required:"required", name:"time"}}
                    onChange={this.handleTime}
                />
                <FormControl.Feedback />
                <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="otherLocation" validationState={this.state.validationState['otherLocationState']}>
                    <ControlLabel controlId="otherLocation">Other Location</ControlLabel>
                    <FormControl
                        required
                        type="text"
                        value={this.state.observation.otherLocation}
                        placeholder=""
                        onChange={this.handleChange}
                        id="otherLocation"
                        name="otherLocation"
                    />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="volunteers" validationState={this.state.validationState['volunteersState']}>
                    <ControlLabel controlId="volunteers">Volunteers</ControlLabel>
                    <Typeahead
                        ref="volunteerType"
                        labelKey="name"
                        onChange={this.handleVolunteersChange}
                        options={this.state.volunteers}
                        id="volunteers"
                        allowNew={true}
                        multiple={true}
                        selected={this.state.observation.volunteers}
                    />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="weatherComment" validationState={this.state.validationState['weatherCommentState']}>
                    <ControlLabel controlId="weatherComment">Weather Comment </ControlLabel>
                    <FormControl
                        required
                        type="text"
                        value={this.state.observation.weatherComment}
                        placeholder="weatherComment"
                        onChange={this.handleChange}
                        id="weatherComment"
                        name="weatherComment"
                    />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="beaufordWindScale" validationState={this.state.validationState['beaufordWindScaleIdState']}>
                    <ControlLabel controlId="beaufordWindScale">Beauford Wind Scale (1-5)</ControlLabel>
                        <SelectBox id="beaufordWindScale" onChange={this.handleChange} name="beaufordWindScale" data={this.state.beaufordWindScale} />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="rainfall" validationState={this.state.validationState['windDirectionState']}>
                    <ControlLabel controlId="rainfall">Rainfall</ControlLabel>
                        <SelectBox id="rainfall" onChange={this.handleChange} name="rainfall" data={this.state.rainfall} />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="cloudCoverId" validationState={this.state.validationState['cloudCoverIdState']}>
                    <ControlLabel controlId="cloudCover">Cloud Cover</ControlLabel>
                    <CloudCover
                    id="cloudCover"
                    cloudCoverValue={this.state.cloudCover}
                    required
                    />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <FormGroup controlId="" validationState={this.state.validationState['exceptionalWeatherConditionsState']}>
                    <ControlLabel controlId="exceptionalWeatherConditions">Recent Exceptional Weather Conditions</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="textarea" value={this.state.observation.exceptionalWeatherConditions}
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
