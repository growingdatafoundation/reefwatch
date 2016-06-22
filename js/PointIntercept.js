import React from 'react'
import CustomGrid from './components/GridControl/Grid'
import { Grid, Col, Row } from 'react-bootstrap';

export default React.createClass({
    validateNumber: function (value) {
        if (isNaN(value)) {
            return 'Please only enter numbers.'
        }
        return true;
    },
    render() { 
        var data = { 
            columnData: [{ columnHeaderText: "", IsVertical: false, controlType: "display"}, 
                            { columnHeaderText: "Sediment depth (mm)", IsVertical: true, controlType: "text"}, 
                            { columnHeaderText: "Rock", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Turf", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Encrusting algae", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Foliaceous algae", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Neptunes necklace", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Sea Lettuce", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Seagrass", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Tube worms", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Mussels", IsVertical: true, controlType: "check"},
                            { columnHeaderText: "Other", IsVertical: true, controlType: "text"} 
                          ],
            rowData: [ 
                { 
                    row: [
                        { value: "10", IsRowHeader: true },   
                        { value: ""},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: ""}   
                    ]
                },
                { 
                    row: [
                        { value: "20", IsRowHeader: true},   
                        { value: ""},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: false},   
                        { value: true},   
                        { value: true},   
                        { value: ""}   
                    ] 
                },
                { 
                    row: [
                        { value: "30", IsRowHeader: true},   
                        { value: ""},   
                        { value: true},   
                        { value: false},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"}   
                    ] 
                },
                { 
                    row: [
                        { value: "40", IsRowHeader: true},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"}   
                    ] 
                }
            ]
        };
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2>Point Intercept</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CustomGrid data={data} />
                    </Col>
                </Row>
            </Grid>
        )
    }
}) 