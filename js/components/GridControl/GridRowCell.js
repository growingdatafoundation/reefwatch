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
                            onChange={this.props.columnData.ChangeEvent.bind(null, this.props.row)}
                            value={this.props.data} />;
                break;
            case "display":
                result = this.props.data;
                break;
            case "number":
                result = <FormControl
                            className="number-field"
                            type="text"
                            onChange={this.props.columnData.ChangeEvent.bind(null, this.props.row)}
                            value={this.props.data} />;
                break;
            case "check":
                var checkedValue = (this.props.data) ? "checked" : "";
                result = <FormControl
                            type="checkbox"
                            onChange={this.props.columnData.ChangeEvent.bind(null, this.props.row)}
                            checked={checkedValue} />;
                break;
            case "select":
                result = <SelectBox onChange={this.props.columnData.ChangeEvent.bind(null, this.props.row)} data={this.props.columnData.data} />;
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
                    {this.buildControl(this.props.columnData.controlType)}
                </td>
        )
    }
});
   
module.exports = gridRowCell;