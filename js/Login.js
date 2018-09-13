import React from 'react'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'
import {  Link, browserHistory, Router, Route, hashHistory, IndexRoute } from 'react-router'
import moment from "moment";
import { Redirect } from 'react-router-dom';
import SelectBox from './components/SelectBox'
//import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath';
import validator from 'bootstrap-validator';
import ChangePassword from './PasswordChange';
import Typeahead from 'react-bootstrap-typeahead';

import AWS from 'aws-sdk';
import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';

import CONFIG from '../config/index';

export default React.createClass({
    componentWillMount: function() {
        this.setState({idToken: this.login()})

      },
      getInitialState: function() {
        return {"login" : { "email": "", "password": "" }, "loggedIn":""};
    },
    handleChange: function(e) {
        var newState = this.state.login;
        newState[e.target.id] = e.target.value;
        this.setState({"login": newState});
    },
    login: function() {

     //   e.preventDefault();
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
        var idToken = localStorage.getItem('id_token');

        if (!idToken){

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
                 return this.setState({ error: true });
                 // TODO replace alert
                 // eslint-disable-next-line no-alert, no-unreachable
                 alert("Please Change Password using Change Password button!!");
            },
            onSuccess:function (result){
                var url = 'cognito-idp.' + CONFIG.aws.region.toLowerCase() + '.amazonaws.com/' + CONFIG.aws.userPoolId;
                localStorage.setItem('id_token', result.getAccessToken().getJwtToken());
                window.location.reload()
                AWS.config.region =  CONFIG.aws.region;

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                  IdentityPoolId:'',
                  Logins : {
                        url : result.getIdToken().getJwtToken(),
                     },

                 });

            },
            onFailure: function(err){
                // TODO
                return err;
              },
        });
    } else {
        this.setState({idToken: idToken})
    }
        return idToken;
        //Ends here
    },
    render() {
         if (this.state.idToken){
            return (<LoggedIn idToken={this.state.idToken} />);
        } else {
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
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/changepassword">Change Password</Link>
                    </div>

                </div>

            </div>

        )
    }},
})

  var LoggedIn = React.createClass({
    getInitialState: function() {
      return {
        profile: null,
      }
    },

    componentDidMount: function() {
        this.setState({profile: "Admin"});
    },

    render: function() {

      if (this.state.profile) {
        return (
            <div>
          <h2>Welcome {this.state.profile}</h2>

          <div>
          </div></div>
        );
      } else {
        return (
          <div>Loading profile</div>
        );
      }
    },
  }

);
