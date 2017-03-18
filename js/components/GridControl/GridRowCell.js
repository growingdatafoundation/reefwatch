import React from 'react'
import $ from 'jquery'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';
import SelectBox from '../SelectBox'

var gridRowCell = React.createClass({
    buildControl: function(controlType) {
        var result = "";
        switch(controlType) {
            case "hidden":
                result = "";
                break;
            case "command":
                console.log("Build Command Button")
                result = <Button bsStyle="primary" 
                            onClick={this.props.columnData.action.bind(null, this.props.fieldKey, this.props.row)}>
                                {this.props.columnData.controlName}
                        </Button>;
            case "text":
                if(this.props.columnData.ChangeEvent && this.props.columnData.BlurEvent) {
                    result = (this.props.columnData.ReadOnly) ? this.props.data : <FormControl
                                type="text"
                                onBlur={this.props.columnData.BlurEvent.bind(null, this.props.fieldKey, this.props.row)}
                                onChange={this.props.columnData.ChangeEvent.bind(null, this.props.fieldKey, this.props.row)}
                                value={this.props.data} />;

                } else if(this.props.columnData.ChangeEvent) {
                    result = (this.props.columnData.ReadOnly) ? this.props.data : <FormControl
                                type="text"
                                onChange={this.props.columnData.ChangeEvent.bind(null, this.props.fieldKey, this.props.row)}
                                value={this.props.data} />;
                }
                break;
            case "display":
                result = this.props.data;
                break;
            case "number":
                if(this.props.columnData.ChangeEvent && this.props.columnData.BlurEvent) {
                    result = (this.props.columnData.ReadOnly) ? this.props.data : <FormControl
                                className="number-field"
                                type="text"
                                onBlur={this.props.columnData.BlurEvent.bind(null, this.props.fieldKey, this.props.row)}
                                onChange={this.props.columnData.ChangeEvent.bind(null, this.props.fieldKey, this.props.row)}
                                value={this.props.data} />;

                } else if(this.props.columnData.ChangeEvent) {
                    result = (this.props.columnData.ReadOnly) ? this.props.data : <FormControl
                                className="number-field"
                                type="text"
                                onChange={this.props.columnData.ChangeEvent.bind(null, this.props.fieldKey, this.props.row)}
                                value={this.props.data} />;
                }
                break;
            case "check":
                var checkedValue = (this.props.data) ? "checked" : "";
                result = (this.props.columnData.ReadOnly) ? this.props.data : <FormControl
                            type="checkbox"
                            onChange={this.props.columnData.ChangeEvent.bind(null, this.props.fieldKey, this.props.row)}
                            defaultChecked={checkedValue} />;
                break;
            case "select":
                result = <SelectBox disabled={this.props.columnData.ReadOnly} onChange={this.props.columnData.ChangeEvent.bind(null, this.props.fieldKey, this.props.row)} 
                                    value={this.props.data} data={this.props.columnData.data} />;
                break;            
            default:
                break;
        }
        return result;
    },
    render() {
        return (
            ("IsRowHeader" in this.props.columnData)  ?
                <th className='row-header' style={{display: this.props.columnData.isHidden}}  key={this.props.key}>
                    {this.props.data}
                </th>
                :
                <td key={this.props.key} style={{display: this.props.columnData.isHidden}}>
                    {this.buildControl(this.props.columnData.controlType)}
                </td>
        )
    }
});
   
module.exports = gridRowCell;