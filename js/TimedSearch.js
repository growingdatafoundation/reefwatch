import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Form, Button, FormGroup, ControlLabel, FormControl, Grid, Col, Row } from 'react-bootstrap';
import CustomGrid from './components/GridControl/Grid'
import * as Data from "../data/data"
import Panel from "./components/Panel"
import SelectBox from "./components/SelectBox"
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from "moment";
import * as services from "../data/services"

// export default React.createClass({

export default class TimedSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            time: moment(),
            species: [], // [{ id: String(Guid), commonName: String, ScientificName: String }]
            selectableSpecies: [],
            columnData: [
                { fieldName: "speciesId", isHidden: "none", controlType: "hidden"},
                { fieldName: "speciesName", ReadOnly: true, columnHeaderText: "species", IsVertical: true, ChangeEvent: this.onChangeSpecies, controlType: "select", data: this.getData(), IsRowHeader: true }, 
                { fieldName: "submerged", ReadOnly: false, columnHeaderText: "submerged (in water)", IsVertical: true, ChangeEvent: this.onChange,  controlType: "number"}, 
                { fieldName: "exposed", ReadOnly: false, columnHeaderText: "exposed", IsVertical: true, ChangeEvent: this.onChange, controlType: "number"}, 
                { fieldName: "crevice", ReadOnly: false, columnHeaderText: "In a crevice", IsVertical: true, ChangeEvent: this.onChange, controlType: "number"}, 
                { fieldName: "sandy", ReadOnly: false, columnHeaderText: "On a sandy patch", IsVertical: true, ChangeEvent: this.onChange, controlType: "number"}, 
                { fieldName: "other", ReadOnly: false, columnHeaderText: "other?", IsVertical: false, ChangeEvent: this.onChange, controlType: "text"}
            ],
            rows: []
        };
    }

    getData() {

        // Load species data from DB
        return services.GetSpecies((species) => {

            this.species = species;
            this.setState({ selectableSpecies: species });
        })
        .fail((err) => console.error('Error occured getting data in TimedSearch', err))
    }


    onChange(key, row, e) {
        var species = e.target.value;
        row[key] = species;
        this.setState(row);
    }

    onChangeSpecies(key, row, e) {
        var species = e.target.value;
        this.selectedSpecies.push(species);
        var rows = this.state.rowData;
        // update the correct row in the state
        this.setState();
    }

    speciesIsValid(species) {
        // Does data already contain row
        return (!this.state.selectedSpecies.indexOf(species)!==-1);
    }

    beforeSave(row, cellName, cellValue) {
      
    }

    validateNumber(value) {
        if (isNaN(value)) {
            return 'Please only enter numbers.'
        }
        return true;
    }

    addRow(e) {

        e.preventDefault();
        const rowData = this.state.rows;

        const selectedSpeciesIndex = e.target[0].options.selectedIndex;
        const selectedSpecies = this.state.selectableSpecies[selectedSpeciesIndex];

        const row = {
            speciesId: selectedSpecies.id,
            speciesName: selectedSpecies.commonName,
            submerged: e.target[1].value, 
            exposed: e.target[2].value,
            crevice: e.target[3].value,
            sandy: e.target[4].value, 
            other: e.target[5].value
        };

        rowData.push(row);
        this.setState({rows: rowData});

        const selectableSpecies = this.filterSelectableSpecies();
        this.setState({ selectableSpecies });
    }

    filterSelectableSpecies() {

        const rowData = this.state.rows;
        
        return this.species.filter(
            (s) => {
                
                for (const row of rowData) {
                    if (row.speciesId === s.id) {
                        return false;
                    }
                }

                return true;
            });
    }

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
                            <Form inline onSubmit={(e) => this.addRow(e)}>
                                <Panel heading={"Species Found"} type={"primary"}>
                                    <FormGroup controlId="species">
                                        <ControlLabel>Species </ControlLabel>
                                        <SelectBox ref="species" name="species" fields={["id", "commonName"]} data={this.state.selectableSpecies} />
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
}
