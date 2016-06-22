import React from 'react'
import $ from 'jquery'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';
import SelectBox from '../SelectBox'

var gridRowCell = React.createClass({
    buildControl: function(controlType) {
        var result = "";
        switch(controlType) {
            case "text":
                result = <FormControl
                            type="text"
                            value={this.props.data.value} />;
                break;
            case "display":
                result = this.props.data.value;
                break;
            case "number":
                result = <FormControl
                            className="number-field"
                            type="text"
                            value={this.props.data.value} />;
                break;
            case "check":
                var checkedValue = (this.props.data.value) ? "checked" : "";
                result = <FormControl
                            type="checkbox"
                            checked={checkedValue} />;
                break;
            case "select":
                result = <SelectBox data={this.props.controlData} />;
                break;            
            default:
                break;
        }
        return result;
    },
    render() {
        return (
            (this.props.data.IsRowHeader===true) ?
                <th className='row-header' key={this.props.key}>
                    {this.props.data.value}
                </th>
                :
                <td key={this.props.key}>
                    {this.buildControl(this.props.controlType)}
                </td>
        )
    }
});
   
module.exports = gridRowCell;