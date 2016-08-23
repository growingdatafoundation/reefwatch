import React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import CustomGrid from './components/GridControl/Grid'

export default React.createClass({
    getInitialState: function() {
        return { 
            columnData: [{ fieldName: "distance", ChangeEvent: this.onChange, IsKey: true, columnHeaderText: "", IsVertical: false, controlType: "display", IsRowHeader: true }, 
                            { fieldName: "nerita", ChangeEvent: this.onChange,  columnHeaderText: "Nerita atramentosa", IsVertical: true, controlType: "number"}, 
                            { fieldName: "austrocochlea", ChangeEvent: this.onChange, columnHeaderText: "Austrocochlea spp", IsVertical: true, controlType: "number"}, 
                            { fieldName: "bembicium", ChangeEvent: this.onChange, columnHeaderText: "Bembicium spp", IsVertical: true, controlType: "number"}, 
                            { fieldName: "lepsiella", ChangeEvent: this.onChange,  columnHeaderText: "Lepsiella spp", IsVertical: true, controlType: "number"}, 
                            { fieldName: "checkerboardSnail", ChangeEvent: this.onChange, columnHeaderText: "Checkerboard Snail", IsVertical: true, controlType: "number"}, 
                            { fieldName: "turbo", ChangeEvent: this.onChange, columnHeaderText: "Turbo undulatus", IsVertical: true, controlType: "number"}, 
                            { fieldName: "commonLimpet", ChangeEvent: this.onChange, columnHeaderText: "Common limpet (Cellana spp)", IsVertical: true, controlType: "number"}, 
                            { fieldName: "rockWhelk", ChangeEvent: this.onChange,  columnHeaderText: "Rock Whelk (Dicathais orbita)", IsVertical: true, controlType: "number"}, 
                            { fieldName: "haliotis", ChangeEvent: this.onChange,  columnHeaderText: "Haliotis spp", IsVertical: true, controlType: "number"}, 
                            { fieldName: "falseLimpets", ChangeEvent: this.onChange, columnHeaderText: "False limpets (Siphonaria spp)", IsVertical: true, controlType: "number"}, 
                            { fieldName: "rockCrab", ChangeEvent: this.onChange, columnHeaderText: "Rock crab (Ozius truncatuus)", IsVertical: true, controlType: "number"}, 
                            { fieldName: "pebbleCrab", ChangeEvent: this.onChange, columnHeaderText: "Pebble crab", IsVertical: true, controlType: "number"}, 
                            { fieldName: "other1", ChangeEvent: this.onChange, columnHeaderText: "Other", IsVertical: true, controlType: "text"},
                            { fieldName: "other2", ChangeEvent: this.onChange, columnHeaderText: "Other", IsVertical: true, controlType: "text"},
                            { fieldName: "other3",  ChangeEvent: this.onChange, columnHeaderText: "Other", IsVertical: true, controlType: "text"}
                          ],
            rows: [ 
                { distance: "Number of individuals between 0-2m",nerita: 0,austrocochlea: 1,bembicium: 2,lepsiella: 3,checkerboardSnail: 4, turbo: 5, commonLimpet: 6,rockWhelk: 66,haliotis: 7,falseLimpets: 8,rockCrab: 9,pebbleCrab: 10, other1: 11,other2: 12, other3: 13},  
                { distance: "Number of individuals between 4-6m",nerita: 0,austrocochlea: 1,bembicium: 2,lepsiella: 3,checkerboardSnail: 4, turbo: 5, commonLimpet: 6,rockWhelk: 66,haliotis: 7,falseLimpets: 8,rockCrab: 9,pebbleCrab: 10, other1: 11,other2: 12, other3: 13},  
                { distance: "Number of individuals between 8-10m",nerita: 0,austrocochlea: 1,bembicium: 2,lepsiella: 3,checkerboardSnail: 4, turbo: 5, commonLimpet: 6,rockWhelk: 66,haliotis: 7,falseLimpets: 8,rockCrab: 9,pebbleCrab: 10, other1: 11,other2: 12, other3: 13},  
                { distance: "Number of individuals between 12-14m",nerita: 0,austrocochlea: 1,bembicium: 2,lepsiella: 3,checkerboardSnail: 4, turbo: 5, commonLimpet: 6,rockWhelk: 66,haliotis: 7,falseLimpets: 8,rockCrab: 9,pebbleCrab: 10, other1: 11,other2: 12, other3: 13},  
                { distance: "Number of individuals between 16-18m",nerita: 0,austrocochlea: 1,bembicium: 2,lepsiella: 3,checkerboardSnail: 4, turbo: 5, commonLimpet: 6,rockWhelk: 66,haliotis: 7,falseLimpets: 8,rockCrab: 9,pebbleCrab: 10, other1: 11,other2: 12, other3: 13}  
            ]};
    },  
    beforeSave: function (row, cellName, cellValue) {
      
    },
    onChange: function(key, row, e) {
        var rows = this.state.rows;
        row[key] = e.target.value;
        rows[row.index] = row;
        this.setState({rows: rows});
    },        
    validateNumber: function (value) {
        if (isNaN(value)) {
            return 'Please only enter numbers.'
        }
        return true;
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

