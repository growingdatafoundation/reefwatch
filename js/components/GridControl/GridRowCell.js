import React from 'react'
import $ from 'jquery'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';

var gridRowCell = React.createClass({
    buildControl: function(controlType) {
        alert(controlType);
        var result = "";
        switch(controlType) {
            case "text":
                result = <FormControl
                        type="text"
                        value={this.props.value} />;
                break;
            case "display":
                result = this.props.value;
                break;
            case "radio":
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