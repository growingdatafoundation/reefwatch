import React from 'react'
import { Modal, Button, FormGroup, Col, ControlLabel, FormControl, HelpBlock, Checkbox } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'
import moment from "moment";
import SelectBox from './components/SelectBox'
import validator from 'bootstrap-validator';
import Typeahead from 'react-bootstrap-typeahead';
import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';
import { Link } from 'react-router';

export default React.createClass({
      render() {
        return (
            <div>
                <div>
                    <h2>Welcome to Reef Watch</h2>
                </div>

            </div>
        )
    }
})
