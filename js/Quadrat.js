import React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import CustomGrid from './components/GridControl/Grid'
import * as services from "../data/services"


/*
{ fieldName: "distance", ChangeEvent: this.onChange, IsKey: true, columnHeaderText: "", IsVertical: false, controlType: "display", IsRowHeader: true }, 
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
{ fieldName: "pebbleCrab", ChangeEvent: this.onChange, columnHeaderText: "Pebble crab", IsVertical: true, controlType: "number"}

{ distance: "Number of individuals between 0-2m",nerita: 0,austrocochlea: 1,bembicium: 2,lepsiella: 3,checkerboardSnail: 4, turbo: 5, commonLimpet: 6,rockWhelk: 66,haliotis: 7,falseLimpets: 8,rockCrab: 9,pebbleCrab: 10, other1: 11,other2: 12, other3: 13},  
{ distance: "Number of individuals between 4-6m",nerita: 0,austrocochlea: 1,bembicium: 2,lepsiella: 3,checkerboardSnail: 4, turbo: 5, commonLimpet: 6,rockWhelk: 66,haliotis: 7,falseLimpets: 8,rockCrab: 9,pebbleCrab: 10, other1: 11,other2: 12, other3: 13},  
{ distance: "Number of individuals between 8-10m",nerita: 0,austrocochlea: 1,bembicium: 2,lepsiella: 3,checkerboardSnail: 4, turbo: 5, commonLimpet: 6,rockWhelk: 66,haliotis: 7,falseLimpets: 8,rockCrab: 9,pebbleCrab: 10, other1: 11,other2: 12, other3: 13},  
{ distance: "Number of individuals between 12-14m",nerita: 0,austrocochlea: 1,bembicium: 2,lepsiella: 3,checkerboardSnail: 4, turbo: 5, commonLimpet: 6,rockWhelk: 66,haliotis: 7,falseLimpets: 8,rockCrab: 9,pebbleCrab: 10, other1: 11,other2: 12, other3: 13},  
{ distance: "Number of individuals between 16-18m",nerita: 0,austrocochlea: 1,bembicium: 2,lepsiella: 3,checkerboardSnail: 4, turbo: 5, commonLimpet: 6,rockWhelk: 66,haliotis: 7,falseLimpets: 8,rockCrab: 9,pebbleCrab: 10, other1: 11,other2: 12, other3: 13}  

*/


export default class Quadrat extends React.Component {

    constructor(props) {
        super(props);

        this.state =  { 
            columnData: [],
            rows: []
        };
        this.loadColumnData();
    }

    beforeSave(row, cellName, cellValue) {
      
    }

    componentDidMount() {
        console.log("Column Data|"+this.state.columnData+"|");
        this.loadRowData(this.state.columnData);
    }

    loadColumnData() {
        //{ fieldName: "distance", ChangeEvent: this.onChange, IsKey: true, columnHeaderText: "", IsVertical: false, controlType: "display", IsRowHeader: true }
        services.GetQuadratSpecies((quadratSpecies) => {
            let columns = [];
            columns.push({ fieldName: "distance", ChangeEvent: this.onChange, IsKey: true, columnHeaderText: "", IsVertical: false, controlType: "display", IsRowHeader: true });
            quadratSpecies.forEach((item, index) => {
                let column = { fieldName: item.id, ChangeEvent: this.onChange, columnHeaderText: item.name, IsVertical: true, controlType: "number"};
                columns.push(column)
            })
            this.setState({ columnData: columns });
        })
        
    }

    loadRowData(columns) {
        services.GetQuadratRange((QuadratRange) => {
            var rows = [];
            QuadratRange.forEach((item, index) => {
                //{ distance: "Number of individuals between 0-2m",nerita: 0,austrocochlea: 1,bembicium: 2,lepsiella: 3,checkerboardSnail: 4, turbo: 5, commonLimpet: 6,rockWhelk: 66,haliotis: 7,falseLimpets: 8,rockCrab: 9,pebbleCrab: 10, other1: 11,other2: 12, other3: 13},
                var row = {};
                columns.forEach((column, index) => {
                    if(column.fieldName=='distance') {
                        row['distance'] = item.range;
                    } else {
                        row[column.fieldName] = 0;
                    }
                })
                console.log(row);
                rows.push(row);
            })
            console.log("Rows->");
            console.log(rows);
            this.setState({ rows: rows });
        })
        
    }

    onChange(key, row, e) {
        var rows = this.state.rows;
        var value = e.target.value.replace(/[^0-9]/g, '');
        row[key] = value;
        this.setState({rows: rows});
    }

    validateNumber(value) {
        if (isNaN(value)) {
            return 'Please only enter numbers.'
        }
        return true;
    }

    render() {                
        return (  
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2>Species Quadrat Survey</h2>
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

