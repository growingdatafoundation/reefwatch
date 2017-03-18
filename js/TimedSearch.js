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
                { fieldName: "speciesId", isHidden: "none", controlType: "hidden", IsKey: true },
                { fieldName: "speciesName", ReadOnly: true, columnHeaderText: "species", IsVertical: true, ChangeEvent: this.onChangeSpecies, controlType: "select", data: this.getData(), IsRowHeader: true }, 
                { fieldName: "submerged", ReadOnly: false, columnHeaderText: "submerged (in water)", IsVertical: true, ChangeEvent: (key, row, e) => this.onChange(key, row, e),  controlType: "number"}, 
                { fieldName: "exposed", ReadOnly: false, columnHeaderText: "exposed", IsVertical: true, ChangeEvent: (key, row, e) => this.onChange(key, row, e), controlType: "number"}, 
                { fieldName: "crevice", ReadOnly: false, columnHeaderText: "In a crevice", IsVertical: true, ChangeEvent: (key, row, e) => this.onChange(key, row, e), controlType: "number"}, 
                { fieldName: "sandy", ReadOnly: false, columnHeaderText: "On a sandy patch", IsVertical: true, ChangeEvent: (key, row, e) => this.onChange(key, row, e), controlType: "number"}, 
                { fieldName: "other", ReadOnly: false, columnHeaderText: "other?", IsVertical: true, ChangeEvent: (key, row, e) => this.onChange(key, row, e), controlType: "text"},
                { fieldName: "command", columnHeaderText: "Command", controlName: "Delete", IsVertical: true, controlType: "command", action: (key, row, e) => this.onDelete(key, row, e) }
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

    onDelete(key, row, e) {
        e.preventDefault();

        console.log("Key",key)
        console.log("Row",row)

        const rowData = this.state.rows;
        const rows = rowData.filter((currentRow) => currentRow.speciesId !== row.speciesId);

        const selectableSpecies = this.filterSelectableSpecies(rows);
        this.setState({
            rows, 
            selectableSpecies,
        });
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
            submerged: "", 
            exposed: "",
            crevice: "",
            sandy: "", 
            other: "",
            command: ""
        };

        rowData.push(row);

        const selectableSpecies = this.filterSelectableSpecies(rowData);
        this.setState({
            rows: rowData,
            selectableSpecies,
        });
    }

    filterSelectableSpecies(rows) {
        
        return this.species.filter(
            (s) => {
                
                for (const row of rows) {
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
