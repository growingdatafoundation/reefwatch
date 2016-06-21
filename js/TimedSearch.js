import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Grid from './components/GridControl/Grid'

export default React.createClass({
    getInitialState: function() {
        var species = [
          {value: 1, display: "Rock Crab / Reef Crab"},
          {value: 2, display: "Pebble Crab"},
          {value: 3, display: "Crab Other"},
          {value: 4, display: "Anemones"},
          {value: 5, display: "Nerita atramentosa"},
          {value: 6, display: "Austrocochlea spp."},
          {value: 7, display: "Bembicium spp."},
          {value: 8, display: "Lepsiella spp."},
          {value: 9, display: "Checkerboard snail"},
          {value: 10, display: "True limpet >5 mm"},
          {value: 11, display: "Siphon limpets"},
          {value: 12, display: "Rock whelk"},
          {value: 13, display: "Barnacles"},
          {value: 14, display: "Mussels"},
          {value: 15, display: "Tube worms"},
          {value: 16, display: "Nudibranchs"},
          {value: 17, display: "Sea stars"},
          {value: 18, display: "Chitons"},
          {value: 19, display: "Elephant snail"},
          {value: 20, display: "Sea centipede"},
          {value: 21, display: "Sea hare"},
          {value: 22, display: "Feral marine species"},
          {value: 23, display: "Marine debris - plastic"},
          {value: 24, display: "Marine debris - non-plastic"},
          {value: 25, display: "Other"}
        ];
        
        return { 
            columnData: [{ columnHeaderText: "species", IsVertical: false, controlType: "select", data: species, IsRowHeader: true }, 
                            { columnHeaderText: "submerged (in water)", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "exposed", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "In a crevice", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "On a sandy patch", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "other?", IsVertical: false, controlType: "text"}
                          ],
            rowData: [ 
                { 
                    row: [
                        { value: "Species"},   
                        { value: "0"},   
                        { value: "0"},   
                        { value: "0"},   
                        { value: "0"},   
                        { value: "0"}
                    ]
                }
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
                    row: [
                        { value: "test"},   
                        { value: "0"},   
                        { value: "0"},   
                        { value: "0"},   
                        { value: "0"},   
                        { value: "0"}
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
            <div className="container">
                <h2>Timed Search</h2>
                <Grid data={this.state} />
                <button className="btn btn-primary" style={{"marginLeft": "10px"}} onClick={this.addRow}>Add</button>
            </div>
        )
    }
}) 
