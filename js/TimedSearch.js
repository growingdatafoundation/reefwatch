import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Form, Button, FormGroup, ControlLabel, FormControl, Grid, Col, Row } from 'react-bootstrap';
import CustomGrid from './components/GridControl/Grid'
import * as Data from "../data/data"
import Panel from "./components/Panel"
import SelectBox from "./components/SelectBox"
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from "moment";


export default React.createClass({
    onChange: function(key, row, e) {
        var species = e.target.value;
        row[key] = species;
        this.setState(row);
    },
    onChangeSpecies: function (key, row, e) {
        var species = e.target.value;
        this.selectedSpecies.push(species);
        var rows = this.state.rowData;
        // update the correct row in the state
        this.setState();
    },
    speciesIsValid: function (species) {
        // Does data already contain row
        return (!this.state.selectedSpecies.indexOf(species)!==-1);
    },
    getInitialState: function() {
        
        // Load species data from DB
        var species = Data.loadSpecies();        
        return { 
            time: moment(),
            species: species,
            columnData: [{ fieldName: "species", ReadOnly: true, columnHeaderText: "species", IsKey: true, IsVertical: false, ChangeEvent: this.onChangeSpecies, controlType: "select", data: species, IsRowHeader: true }, 
                            { fieldName: "submerged", ReadOnly: true, columnHeaderText: "submerged (in water)", ChangeEvent: this.onChange, IsVertical: true, controlType: "number"}, 
                            { fieldName: "exposed", ReadOnly: true, columnHeaderText: "exposed", IsVertical: true, ChangeEvent: this.onChange, controlType: "number"}, 
                            { fieldName: "crevice", ReadOnly: true, columnHeaderText: "In a crevice", IsVertical: true, ChangeEvent: this.onChange, controlType: "number"}, 
                            { fieldName: "sandy", ReadOnly: true, columnHeaderText: "On a sandy patch", IsVertical: true, ChangeEvent: this.onChange, controlType: "number"}, 
                            { fieldName: "other", ReadOnly: true, columnHeaderText: "other?", IsVertical: false, ChangeEvent: this.onChange, controlType: "text"}
                          ],
            rows: []};
    },  
    beforeSave: function (row, cellName, cellValue) {
      
    },
    validateNumber: function (value) {
        if (isNaN(value)) {
            return 'Please only enter numbers.'
        }
        return true;
    },
    addRow: function (e) {
        e.preventDefault();
        var rowData = this.state.rows;
        var row = { species: e.target[0].options[e.target[0].value-1].innerText, submerged: e.target[1].value, 
            exposed: e.target[2].value, crevice: e.target[3].value, sandy: e.target[4].value, 
            other: e.target[5].value };
        rowData.push(row);
        this.setState({rows: rowData});
    },
    render() {                
        return (  
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2>Timed Search</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                            <Form inline onSubmit={this.addRow}>
                                <Panel heading={"Observation Details"} type={"primary"}>
                                    <FormGroup controlId="time">
                                    <ControlLabel controlId="time">Observation Time</ControlLabel>
                                    <DateTimeField
                                        mode="time"
                                        id="time"
                                        dateTime={this.state.time}
                                        inputProps={{required:"required", name:"time"}}
                                        onChange={this.handleTime}
                                    />
                                    </FormGroup>
                                </Panel>
                                <Panel heading={"Species Found"} type={"primary"}>
                                    <FormGroup controlId="species">
                                        <ControlLabel>Survey location</ControlLabel>
                                        <SelectBox ref="species" name="species" data={this.state.species} />
                                    </FormGroup>
                                    <FormGroup controlId="submerged">
                                        <ControlLabel>Submerged</ControlLabel>
                                        <FormControl ref="submerged" name="submerged" className="number-field" type="text" />
                                    </FormGroup>
                                    <FormGroup controlId="exposed">
                                        <ControlLabel>exposed</ControlLabel>
                                        <FormControl ref="exposed" name="exposed" className="number-field" type="text" />
                                    </FormGroup>
                                    <FormGroup controlId="crevice">
                                        <ControlLabel>crevice</ControlLabel>
                                        <FormControl ref="crevice" name="crevice" className="number-field" type="text" />
                                    </FormGroup>
                                    <FormGroup controlId="sandy">
                                        <ControlLabel>sandy</ControlLabel>
                                        <FormControl ref="sandy" name="sandy" className="number-field" type="text" />
                                    </FormGroup>
                                    <FormGroup controlId="other">
                                        <ControlLabel>Other</ControlLabel>
                                        <FormControl ref="other" name="other" className="number-field" type="text" />
                                    </FormGroup>
                                    <button className="btn btn-primary" style={{"marginLeft": "10px"}}>Add</button>
                                </Panel>
                            </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CustomGrid data={this.state} />
                    </Col>
                </Row>
            </Grid>
        )
    }
}) 
