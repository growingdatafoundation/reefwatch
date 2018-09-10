import React from 'react'
import { Grid, Col, Row } from 'react-bootstrap'
import CustomGrid from './components/GridControl/Grid'
import * as services from "../data/services"

/* eslint-disable new-cap */

export default class Quadrat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            observationId: this.props.params.observationId,
            columnData: [],
            rows: [],
            loaded: false,
        }
        this.loadColumnData();

    }

    componentDidUpdate() {
        if (!this.state.loaded && this.state.rows.length > 0) {
            this.setState({loaded: true});
            this.loadData();
        }
    }

    loadData() {
        services.GetQuadrats(this.state.observationId, quadrat => {
            const rows = this.state.rows;

            rows.forEach(row => {

                quadrat.forEach(item => {
                    if (row.quadratRangeId === item.quadratRangeId) {
                        row[item.quadratSpeciesId] = item.count;
                    }
                });
            });
            this.setState({rows: rows});
        });
    }

    loadColumnData() {
        services.GetQuadratSpecies(quadratSpecies => {
            const columns = [];
            columns.push({ fieldName: "distance", ChangeEvent: (key, row, e) => this.onChange(key, row, e), IsKey: true, columnHeaderText: "", IsVertical: false, controlType: "display", IsRowHeader: true });
            columns.push({ fieldName: "quadratRangeId", isHidden: "none", controlType: "hidden" });
            quadratSpecies.forEach(item => {
                const column = { fieldName: item.id, ChangeEvent: (key, row, e) => this.onChange(key, row, e), columnHeaderText: item.name, IsVertical: true, controlType: "number"};
                columns.push(column)
            })
            this.loadQuadRange(columns);
        })
    }

    loadQuadRange(columns) {
        services.GetQuadratRange(QuadratRange => {
            var rows = [];
            QuadratRange.forEach(item => {
                var row = {};
                columns.forEach(column => {
                    if (column.fieldName === 'distance') {
                        row.distance = item.range;
                    } else if (column.fieldName === 'quadratRangeId') {
                        row.quadratRangeId = item.id;
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
        const cell = {
            "count": value,
            "observationId": observationId,
            "quadratSpeciesId": key,
            "quadratRangeId": row.quadratRangeId,
        };

        services.upsertQuadrat(cell, result => {
            // TODO
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
