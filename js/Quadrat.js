import React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import CustomGrid from './components/GridControl/Grid'
import * as services from "../data/services"

export default class Quadrat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            observationId: this.props.params.observationId,
            columnData: [],
            rows: [],
            loaded: false
        }
        this.loadColumnData();
        
    }

    componentDidUpdate() {
        if(!this.state.loaded && this.state.rows.length>0) {
            this.setState({loaded: true});
            this.loadData();
        }
    }

    loadData() {
        services.GetQuadrats(this.state.observationId, (quadrat) => {
            let rows = this.state.rows;
            console.log("State.rows->");
            console.log(rows);
            rows.forEach((row, index) => {
                console.log("saved quadrat->");
                console.log(quadrat);
                quadrat.forEach((item, index) => {
                    console.log("Compare row.quadratRangeId:"+row['quadratRangeId']+" saved item.quadratRangeId:"+item.quadratRangeId)
                    if (row['quadratRangeId']==item.quadratRangeId) {
                        console.log("set "+item.quadratSpeciesId+" to "+item.count);
                        row[item.quadratSpeciesId] = item.count; 
                    }
                    //console.log("item ->");
                    //console.log(item);
                });
            });
            this.setState({rows: rows});
        });
    }

    loadColumnData() {
        services.GetQuadratSpecies((quadratSpecies) => {
            let columns = [];
            columns.push({ fieldName: "distance", ChangeEvent: (key, row, e) => this.onChange(key, row, e), IsKey: true, columnHeaderText: "", IsVertical: false, controlType: "display", IsRowHeader: true });
            columns.push({ fieldName: "quadratRangeId", isHidden: "none", controlType: "hidden" });
            quadratSpecies.forEach((item, index) => {
                let column = { fieldName: item.id, ChangeEvent: (key, row, e) => this.onChange(key, row, e), columnHeaderText: item.name, IsVertical: true, controlType: "number"};
                columns.push(column)
            })
            this.loadQuadRange(columns);
        })
    }

    loadQuadRange(columns) {
        services.GetQuadratRange((QuadratRange) => {
            var rows = [];
            QuadratRange.forEach((item, index) => {
                var row = {};
                columns.forEach((column, index) => {
                    if(column.fieldName=='distance') {
                        row['distance'] = item.range;
                    } else if(column.fieldName=='quadratRangeId') {
                        row['quadratRangeId'] = item.id;
                    } else {
                        row[column.fieldName] = 0;
                    }
                })
                rows.push(row);
            })
            this.setState({ columnData: columns, rows: rows });
        })
        
    }

    onChange(key, row, e) {
        var rows = this.state.rows;
        var value = e.target.value.replace(/[^0-9]/g, '');
        row[key] = value;
        this.setState({rows: rows});
        this.saveCell(key, value, row, this.state.observationId);
    }

    saveCell(key, value, row, observationId) {
        let cell = {
            "count": value,
            "observationId": observationId,
            "quadratSpeciesId": key,
            "quadratRangeId": row['quadratRangeId']
        };

        services.upsertQuadrat(cell, (result) => {
            console.log(result);
        });

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

