import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Grid, Col, Row } from 'react-bootstrap';
import CustomGrid from './components/GridControl/Grid'
import * as Data from "../data/data"

var selectedSpecies = [];


export default React.createClass({
    onChange: function(row, e) {
        var species = e.target.value;
        var key = row.key;
        if(this.speciesIsValid(species)) {
            var stateRow = this.state.rowData[key];
            stateRow.fields[0].value = species;
            this.setState(stateRow);

            alert(e.target.value)
        }
    },
    onChangeSpecies: function (row, e) {
        var species = e.target.value;
        if(this.speciesIsValid(species)) {
            selectedSpecies.push(species);
            var rows = this.state.rowData;
            //update the correct row in the state
            this.setState();

            alert(e.target.value)
        }
    },
    speciesIsValid: function (species) {
        //Does data already contain row
        return !selectedSpecies.includes(species);
    },
    getInitialState: function() {
        
        //TODO: Load species data from DB
        var species = Data.LoadSpecies();
        
        return { 
            columnData: [{ fieldName: "species", columnHeaderText: "species", IsKey: true, IsVertical: false, ChangeEvent: this.onChangeSpecies, controlType: "select", data: species, IsRowHeader: true }, 
                            { fieldName: "submerged", columnHeaderText: "submerged (in water)", ChangeEvent: this.onChange, IsVertical: true, controlType: "number"}, 
                            { fieldName: "exposed", columnHeaderText: "exposed", IsVertical: true, ChangeEvent: this.onChange, controlType: "number"}, 
                            { fieldName: "crevice", columnHeaderText: "In a crevice", IsVertical: true, ChangeEvent: this.onChange, controlType: "number"}, 
                            { fieldName: "sandy", columnHeaderText: "On a sandy patch", IsVertical: true, ChangeEvent: this.onChange, controlType: "number"}, 
                            { fieldName: "other", columnHeaderText: "other?", IsVertical: false, ChangeEvent: this.onChange, controlType: "text"}
                          ],
            rows: [ 
                { species: 2, submerged: 0, exposed: 0, crevice: 0, sandy: 0, other: "" }    
            ]};
    },  
    beforeSave: function (row, cellName, cellValue) {
      
    },
    validateNumber: function (value) {
        if (isNaN(value)) {
            return 'Please only enter numbers.'
        }
        return true;
    },
    addRow: function () {
        var rowData = this.state.rowData;
        var row = { 
                    rows: [
                        { species: 2, submerged: 0, exposed: 0, crevice: 0, sandy: 0, other: "" }    
                    ]
                };
        rowData.push(row);
        this.setState({rowData: rowData});
    },   
    render() {                

        
        /*
        var data = [
          {id: 1, atlas: "", species: "" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" }
        ];
        */
            
            
        return (  
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2>Timed Search</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <CustomGrid data={this.state} />
                    </Col>
                    <Col md={4}>
                        <button className="btn btn-primary" style={{"marginLeft": "10px"}} onClick={this.addRow}>Add</button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}) 
