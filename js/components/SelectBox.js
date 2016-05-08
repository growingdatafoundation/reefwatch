import React from 'react'
import $ from 'jquery'
import { FormControl } from 'react-bootstrap'

var SelectBox = React.createClass({
    test: function () {
        
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
                <FormControl componentClass="select" placeholder="select"
                    placeholder="Survey Location"
                    onChange={this.handleChange}>
                    {
                        this.props.data.map(function(item) {
                            return <option value={item[fields[0]]}>{item[fields[1]]}</option>;
                        })
                    }
                </FormControl>
            )
    }
});

module.exports = SelectBox;