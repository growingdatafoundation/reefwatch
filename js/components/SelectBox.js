import React from 'react'
import $ from 'jquery'
import { FormControl } from 'react-bootstrap'

var SelectBox = React.createClass({
    renderOption: function (selectValue, value, desc) {
        var option;
        option = <option key={value} value={value}>{desc}</option>;
        return option;
    },
    render() {
        var fields = ["value", "display"];
        if (this.props.fields!=null) {
            this.props.fields.forEach(function (value, i) {
                fields[i] = value;
            });
            if(this.props.fields.length == 1) {
                fields[1] = fields[0];                
            }
        }
        return (
                <FormControl id={this.props.id} name={this.props.name} defaultValue={this.props.value} value={this.props.value} componentClass="select"
                    onChange={this.props.onChange}>
                    {
                        this.props.data.map(function(item) {
                            return this.renderOption(this.props.value, item[fields[0]],item[fields[1]]);
                        }, this)
                    }
                </FormControl>
            )
    }
});

module.exports = SelectBox;