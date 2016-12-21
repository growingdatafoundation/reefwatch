import React from 'react'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'
import moment from "moment";
import SelectBox from './components/SelectBox'
import config from '../config'
import validator from 'bootstrap-validator';
import Typeahead from 'react-bootstrap-typeahead';

export default React.createClass({
    getInitialState: function() {
        return {"login" : { "email": "", "password": "" }};
    },
    handleChange: function(e) {
        var newState = this.state.login;
        newState[e.target.id] = e.target.value;
        this.setState({"login": newState});
    },
    login: function(e) {
        e.preventDefault();
        var data = this.state.login;
        var that = this;
        $.ajax({
            url         : config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/Users/Login",
            data        : JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            type: 'POST'
        }).done(function(data){
            that.setState({ showModal: false });
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
            alert("Username or password incorrect");
        });
    },
    render() {                
        return (
            <div>
                <div>
                    <h2>Login</h2>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup controlId="email">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.email}
                                placeholder="Email"
                                onChange={this.handleChange}
                                email
                                required
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup controlId="password">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                email
                                required
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <Button bsStyle="success" onClick={this.login}>Login</Button>
                    </div>
                </div>
            </div>
        )
    }
})    

