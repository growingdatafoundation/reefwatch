import React from 'react'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'
import moment from "moment";
import SelectBox from './components/SelectBox'
import validator from 'bootstrap-validator';
import Typeahead from 'react-bootstrap-typeahead';
import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Link } from 'react-router';

import AWS from 'aws-sdk';
import CONFIG from '../config';

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
       /*$.ajax({
            url         : CONFIG.api.hostname + ":"+CONFIG.api.port+"/"+CONFIG.api.prefix+"/Users/Login",
            data        : JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            type: 'POST'
        }).done(function(data){
            that.setState({ showModal: false });
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert("Username or password incorrect!!!" + data.email );
        });*/
        //Cognito Auth
        var authData = {
            Username: data.email,
            Password: data.password,
        };
        var authenticationDetails = new AuthenticationDetails(authData);
        var poolData = {
            UserPoolId: CONFIG.aws.userPoolId,
            ClientId: CONFIG.aws.clientId,
        }
        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username:data.email,
            Pool: userPool,
        };


        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired:function(userAttributes, requiredAttributes){
                delete userAttributes.email_verified;
                cognitoUser.completeNewPasswordChallenge(data.newPassword, requiredAttributes,{
                    onSuccess:function(result){
                        alert("Password Changed successfully")
                       //cognitoCallBack.successCallBack("Password Changed Successfully.", null);
                    },
                    onFailure:function(err){
                        //cognitoCallBack.callBack(err.message, null);
                        //jb TODO
                        return err;
                    },
                })
            },

            onSuccess:function (result){
                var url = 'cognito-idp.' + CONFIG.aws.region + '.amazonaws.com/' + CONFIG.aws.userPoolId;
                 AWS.config.region =  CONFIG.aws.region; //TODO use updateConfig
                 AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                     // IdentityPoolId: CognitoUtil.IDENTITY_POOL_ID, //jb TODO, no identity pool set up currently
                     Logins : {
                        url : result.getIdToken().getJwtToken(),
                     },
                 });
            },

            onFailure: function(err){
                //TODO
                // cognitoCallBack.callBack(err.message, null);
                return err;
            },
        });

        //Ends here
    },

    render() {
        return (
            <div>
                <div>
                    <h2>Password</h2>
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
                        <ControlLabel>Enter Temporary Password</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            placeholder="Email"
                            onChange={this.handleChange}
                            email
                            required
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup controlId="newPassword">
                        <ControlLabel>Enter New Password</ControlLabel>
                        <FormControl
                            type="password"
                            placeholder="New Password"
                            value={this.state.newPassword}
                            onChange={this.handleChange}
                            email
                            required
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <Button bsStyle="success" onClick={this.login}>Change Password & Login</Button>


                </div>
            </div>
            </div>
        )
    },
})
