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
    onChange: function(row, e) {
    },
    render() { 
        var data = { 
            columnData: [{ fieldName: "depthlabel", ChangeEvent: this.onChange, IsKey: true, columnHeaderText: "", IsVertical: false, controlType: "display"}, 
                            { fieldName: "sedimentdepth", ChangeEvent: this.onChange,  columnHeaderText: "Sediment depth (mm)", IsVertical: true, controlType: "text"}, 
                            { fieldName: "rock", ChangeEvent: this.onChange,  columnHeaderText: "Rock", IsVertical: true, controlType: "check"}, 
                            { fieldName: "turf",  ChangeEvent: this.onChange, columnHeaderText: "Turf", IsVertical: true, controlType: "check"}, 
                            { fieldName: "encrusting",  ChangeEvent: this.onChange, columnHeaderText: "Encrusting algae", IsVertical: true, controlType: "check"}, 
                            { fieldName: "foliaceous",  ChangeEvent: this.onChange, columnHeaderText: "Foliaceous algae", IsVertical: true, controlType: "check"}, 
                            { fieldName: "neptunes",  ChangeEvent: this.onChange, columnHeaderText: "Neptunes necklace", IsVertical: true, controlType: "check"}, 
                            { fieldName: "sealettuce", ChangeEvent: this.onChange,  columnHeaderText: "Sea Lettuce", IsVertical: true, controlType: "check"}, 
                            { fieldName: "seagrass",  ChangeEvent: this.onChange, columnHeaderText: "Seagrass", IsVertical: true, controlType: "check"}, 
                            { fieldName: "tubeworms", ChangeEvent: this.onChange, columnHeaderText: "Tube worms", IsVertical: true, controlType: "check"}, 
                            { fieldName: "mussels",  ChangeEvent: this.onChange, columnHeaderText: "Mussels", IsVertical: true, controlType: "check"},
                            { fieldName: "other", ChangeEvent: this.onChange,  columnHeaderText: "Other", IsVertical: true, controlType: "text"} 
                          ],
            rows: [ 
                    { depthlabel: "10", sedimentdepth: "", rock: false, turf: false, encrusting: false, foliaceous: false, neptunes: false, sealettuce: false, seagrass: false, tubeworms: true, mussels: true, other: ""},
                    { depthlabel: "20", sedimentdepth: "", rock: false, turf: false, encrusting: false, foliaceous: false, neptunes: false, sealettuce: false, seagrass: false, tubeworms: true, mussels: true, other: ""},
                    { depthlabel: "30", sedimentdepth: "", rock: false, turf: false, encrusting: false, foliaceous: false, neptunes: false, sealettuce: false, seagrass: false, tubeworms: true, mussels: true, other: ""},
                    { depthlabel: "40", sedimentdepth: "", rock: false, turf: false, encrusting: false, foliaceous: false, neptunes: false, sealettuce: false, seagrass: false, tubeworms: true, mussels: true, other: ""}
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