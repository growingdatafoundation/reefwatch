import React from 'react'
import $ from 'jquery'
import { FormControl } from 'react-bootstrap'

var SelectBox = React.createClass({
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
                <FormControl id={this.props.id} name={this.props.name} componentClass="select" placeholder="select"
                    placeholder="Survey Location"
                    onChange={this.props.onChange}>
                    {
                        this.props.data.map(function(item) {
                            return <option key={item[fields[0]]} value={item[fields[0]]}>{item[fields[1]]}</option>;
                        })
                    }
                </FormControl>
            )
    }
});

module.exports = SelectBox;