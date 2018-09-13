import React from 'react'
import {FormControl } from 'react-bootstrap';

/* eslint-disable global-require */
const defaultImage = require("./images/Clear_1.png");

const CloudCover = function(props) {
    const { cloudCoverOptions, cloudCoverId } = props;

    const current = cloudCoverOptions.filter(option => option.id === cloudCoverId);
    const category = (current.length) ? current[0].category : -1;

    let imageSource = require("./images/Clear_1.png");

    switch (category) {
        case 0:
            imageSource = require("./images/Clear_1.png");
            break;
        case 1:
            imageSource  = require("./images/eigths_1.png");
            break;
        case 2:
            imageSource = require("./images/eigths_2.png");
            break;
        case 3:
            imageSource = require("./images/eigths_3.png");
            break;
        case 4:
            imageSource = require("./images/eigths_4.png");
            break;
        case 5:
            imageSource = require("./images/eigths_5.png");
            break;
        case 6:
            imageSource = require("./images/eigths_6.png");
            break;
        case 7:
            imageSource = require("./images/eigths_7.png");
            break;
        case 8:
            imageSource = require("./images/eigths_8.png");
            break;
        default:
            // do nothing
    }

    return (
            <div className="row">
                <div className="col-xs-4">
                    <FormControl
                        name={ props.formElementName }
                        onChange={ props.handleChange }
                        data={ cloudCoverOptions }
                        componentClass="select"
                        value={ cloudCoverId }
                    >
                    { cloudCoverOptions.map(item => <option key={ item.id } value={ item.id }>{ item.type }</option>) }
                    </FormControl>
                </div>
                <div><img className="img-thumbnail" src={ imageSource } /></div>
            </div>
        );

};

module.exports = CloudCover;
