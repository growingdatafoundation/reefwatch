import React from 'react'
import CustomGrid from './components/GridControl/Grid'
import { Grid, Col, Row } from 'react-bootstrap';
import * as Services from "../data/services";

export default React.createClass({
    getInitialState: function() {
        var state = {
            columnData: [{ fieldName: "depthlabel", readonly: true, ChangeEvent: this.onChange, IsKey: true, columnHeaderText: "", IsVertical: false, controlType: "display"}, 
                            { fieldName: "id", isHidden: "none", controlType: "hidden"}, 
                            { fieldName: "observationId", isHidden: "none", controlType: "hidden"}, 
                            { fieldName: "sedimentdepth", ChangeEvent: this.onChange,  columnHeaderText: "Sediment depth (mm)", IsVertical: true, controlType: "number"}, 
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
            rows: []
        };

        var observationId = this.props.params.observationId;
        Services.GetPointInterceptObservation(observationId, function (result) {
            var rows = [];
            for(var i=40;i<=2000;i+=40) {
                var row = null;
                var item = null;
                if(result) {
                    item = this.getItem(result, i);
                }
                if(item) {
                    row = item;
                } else {
                    row = { depthlabel: i.toString(), observationId: "", id: "", sedimentdepth: "", rock: false, turf: false, encrusting: false, foliaceous: false, neptunes: false, sealettuce: false, seagrass: false, tubeworms: false, mussels: false, other: ""};
                }
                rows.push(row);
            }
            this.setState({ rows: rows});
        }.bind(this));

        return state;

    },
    getItem: function(result, index) { 
        for(var i=0;i<result.length;i++) {
            if(result[i].depthlabel == index.toString()) {
                return result[i];
            }
        }
    },
    validateNumber: function (value) {
        if (isNaN(value)) {
            return 'Please only enter numbers.'
        }
        return true;
    },
    onChange: function(key, changedRow, e) {
        var rows = this.state.rows;
        if(changedRow[key]) {
            changedRow[key] = false;
        } else {
            changedRow[key] = true;
        }
        //remove id so it will not add row with blank ID
        if(changedRow["id"]=="") {
            delete changedRow["id"];
        }
        changedRow["observationId"] = this.props.params.observationId;
        Services.SavePointIntercept(changedRow, function (result) {
            rows.forEach(function (item, index) {
                if(item.depthlabel == result.depthlabel) {
                    rows[index] = result;
                }
            });
            this.setState({rows: rows});
        }.bind(this));
    },
    render() { 
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h2>Point Intercept</h2>
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