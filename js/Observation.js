import React from 'react';
import validator from 'bootstrap-validator';
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from "moment";
import {Typeahead} from 'react-bootstrap-typeahead';
import CloudCover from './components/CloudCover';
import SelectBox from './components/SelectBox';
import * as Data from "../data/data"
import * as Services from "../data/services";

/* eslint-disable new-cap */

const uniqueVolunteerRecords = function(records) {

    const unique = [];
    const r = [];

    records.forEach((record) => {
        if (unique.indexOf(record.name) === -1){
            unique.push(record.name);
            r.push(record);
        }
    });

    return r;
}

var Observation = React.createClass({
    getInitialState: function() {
        const observationId = this.props.params.observationId;
        if (observationId) {
            //need to redirect to error page
            // TODO, wrong condition?
        }

        var initialState = {};

        initialState.surveyDay = {
            surveyDate: null
        };
        Services.GetObservationSurveyDay(observationId, result => {
            this.setState({
                surveyDay: result,
            })
        });

        initialState.observation = {
            observationTime: null,
        };
        Services.GetObservation(observationId, result => {
            delete result.id; // doing PUT requests!
            this.setState({
                observation: result,
            })
        });

        initialState.observationVolunteers = [];
        Services.GetVolunteers(observationId, result => {
            this.setState({
                observationVolunteers: result,
            })
        });

        initialState.reefWatchVolunteers = [];
        Services.GetReefWatchVolunteers(result => {
            this.setState({
                reefWatchVolunteers: result,
            });
        });

        initialState.beaufordWindScale = [];
        Services.GetBeaufortScale(result => {
            this.setState({beaufordWindScale: result});
        });

        initialState.cloudCover = [];
        Services.GetCloudCover(result => {
            this.setState({cloudCover: result});
        });

        initialState.rainfall = [];
        Services.GetRainfall(result => {
            this.setState({rainfall: result});
        });

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
            "exceptionalWeatherConditionsState": null,
        };

        return initialState;
    },

    handleChange: function(e) {
        console.log(e.target);
        var observation = this.state.observation;
        observation[e.target.name] = e.target.value;
        this.setState({ observation: observation });
    },

    handleVolunteersChange: function(selectedItems, e) {

        let existing = selectedItems.filter(item => typeof item.customOption === 'undefined');
        existing = uniqueVolunteerRecords(existing);

        let custom = selectedItems.filter(item => typeof item.customOption !== 'undefined');
        custom = uniqueVolunteerRecords(custom);

        // new volunteers: ad-hoc store new volunteers & update both volunteer states
        if (custom.length) {
            const names = custom.map(item => ({ name: item.name }));
            Services.AddReefWatchVolunteer(names, (result) => {

                const reefWatchVolunteers = this.state.reefWatchVolunteers.concat(result);
                const observationVolunteers = existing.concat(result);

                this.setState({
                    reefWatchVolunteers,
                    observationVolunteers,
                });

            });

            return;
        }

        // no new volunteers
        const observationVolunteers = selectedItems;
        this.setState({
            observationVolunteers,
        });
    },

    handleTime: function (timeValue) {console.log(timevalue)
        var observation = this.state.observation;
        observation.time = moment(timeValue);
        this.setState({observation: observation});
    },

    handleSubmit: function(e) {
        e.preventDefault();
        const { observationId } = this.props.params;
        const { observation , observationVolunteers } = this.state;

        //// worflow:
        // add all: POST /Observations/{id}/volunteers
        // always: delete all /DELETE /Observations/{id}/volunteers
        // add observationVolunteers
        // TODO: callback hell

        Services.SaveObservation(observationId, observation, function(oResult) {
            console.log('obs', oResult);
            Services.deleteObservationVolunteers(observationId, function(dResult) {
                // TODO
                if (observationVolunteers.length) {
                    Services.addObservationVolunteers(observationId, observationVolunteers, function(aResult) {
                      // TODO
                    });
                }
            })
        })
    },

    render() {
    return (
        <div className="container">
            <h2>Observation <small>{ (this.state.surveyDay.surveyDate || null) ? moment(this.state.surveyDay.surveyDate).format('DD-MM-YYYY') : null }</small></h2>
            <form id="formObservation" data-toggle="validator" onSubmit={ this.handleSubmit } role="form">

                <FormGroup controlId="observationTime" validationState={this.state.validationState.observationTimeState}>
                <ControlLabel controlId="observationTime">Observation Time</ControlLabel>
                <DateTimeField
                    mode="time"
                    id="observationTime"
                    format="" /* ISO! */
                    inputFormat="DD/MM/YY h:mm A"
                    dateTime={ this.state.observation.observationTime || null }
                    inputProps={{required:"required", name:"observationTime"}}
                    onChange={this.handleTime}
                />
                <FormControl.Feedback />
                <HelpBlock></HelpBlock>
                </FormGroup>

                <FormGroup controlId="otherLocation" validationState={this.state.validationState.otherLocationState}>
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

                <FormGroup controlId="volunteers" validationState={this.state.validationState.volunteersState}>
                    <ControlLabel controlId="volunteers">Volunteers</ControlLabel>
                    <Typeahead
                        ref="volunteerType"
                        labelKey="name"
                        onChange={this.handleVolunteersChange}
                        options={this.state.reefWatchVolunteers}
                        id="volunteers"
                        allowNew={true}
                        multiple={true}
                        selected={this.state.observationVolunteers}
                    />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>

                <FormGroup controlId="weatherComment" validationState={this.state.validationState.weatherCommentState}>
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

                <FormGroup controlId="beaufortScaleId" validationState={this.state.validationState.beaufordWindScaleIdState}>
                    <ControlLabel controlId="beaufortScaleId">Beauford Wind Scale (1-5)</ControlLabel>
                        <SelectBox
                            id="beaufortScaleId"
                            fields={["id", "scaleDescription"]}
                            onChange={this.handleChange}
                            name="beaufortScaleId"
                            value={ this.state.observation.beaufortScaleId || '' }
                            data={this.state.beaufordWindScale}
                        />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>

                <FormGroup controlId="rainfallId" validationState={this.state.validationState.windDirectionState}>
                    <ControlLabel controlId="rainfallId">Rainfall</ControlLabel>
                        <SelectBox
                            id="rainfallId"
                            fields={["id", "type"]}
                            onChange={this.handleChange}
                            name="rainfallId"
                            value={ this.state.observation.rainfallId || '' }
                            data={this.state.rainfall} />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>

                <FormGroup controlId="cloudCoverId" validationState={this.state.validationState.cloudCoverIdState}>
                    <ControlLabel controlId="cloudCoverId">Cloud Cover</ControlLabel>
                    <CloudCover
                        id="cloudCoverId"
                        formElementName="cloudCoverId"
                        cloudCoverOptions={ this.state.cloudCover }
                        cloudCoverId ={ this.state.observation.cloudCoverId || '' }
                        handleChange={ this.handleChange }
                        required
                    />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>

                <FormGroup controlId="recentExceptionalWeather" validationState={this.state.validationState.exceptionalWeatherConditionsState}>
                    <ControlLabel controlId="recentExceptionalWeather">Recent Exceptional Weather Conditions</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            value={ this.state.observation.recentExceptionalWeather || null }
                            placeholder="Any recent tidal, weather, or other unusual events (e.g. hevy rain shortly before survey, storm, heatwave, wind held tide higher than expected)"
                            onChange={this.handleChange}
                            name="recentExceptionalWeather" />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>

                <Button className="primary" type="submit" bsSize="large">Save</Button>

            </form>
        </div>
    );
  },
})

export default Observation;
