import React from 'react'
import { Grid, Col, Row } from 'react-bootstrap';
import CustomGrid from './components/GridControl/Grid'
/*
export default React.createClass({
    getInitialState: function() {
        return { 
            columnData: [{ columnHeaderText: "", IsVertical: false, controlType: "display", IsRowHeader: true }, 
                            { columnHeaderText: "Nerita atramentosa", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "Austrocochlea spp", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "Bembicium spp", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "Lepsiella spp", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "Checkerboard Snail \r\n (Cominella lineolata)", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "Turbo undulatus", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "Common limpet (Cellana spp)", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "Rock Whelk (Dicathais orbita)", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "Haliotis spp", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "False limpets (Siphonaria spp)", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "Rock crab (Ozius truncatuus)", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "Pebble crab", IsVertical: true, controlType: "number"}, 
                            { columnHeaderText: "Other", IsVertical: false, controlType: "text"},
                            { columnHeaderText: "Other", IsVertical: false, controlType: "text"},
                            { columnHeaderText: "Other", IsVertical: false, controlType: "text"}
                          ],
            rows: [ 
                { 
                    fields: [
                        { value: "Species"},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0},   
                        { value: 0}
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
                    fields: [
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
        return (  
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2>Species Qudrat Survey</h2>
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
*/
