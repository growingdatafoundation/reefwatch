import React from 'react'
import $ from 'jquery'
import { FormControl, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'

var WorkingSurveyList = React.createClass({
    handleClick: function (location, survey) {
        $("div.contentPage").animate({
            left: '0px'
        });
    },
    render() {
        return (
                <div className="well">
                    <Button href="#/surveymenu" bsStyle="primary" block onClick={() => this.handleClick([this.props.selectedSurvey],"Lower")} bsSize="large">{this.props.selectedSurvey} Lower<Glyphicon className="pull-right" glyph="menu-right" /></Button>
                    <Button href="#/surveymenu" bsStyle="primary" block onClick={() => this.handleClick([this.props.selectedSurvey],"Middle")} bsSize="large">{this.props.selectedSurvey} Middle<Glyphicon className="pull-right" glyph="menu-right" /></Button>
                    <Button href="#/surveymenu" bsStyle="primary" block onClick={() => this.handleClick([this.props.selectedSurvey],"Upper")} bsSize="large">{this.props.selectedSurvey} Upper<Glyphicon className="pull-right" glyph="menu-right" /></Button>
                </div>
            )
    }
});

module.exports = WorkingSurveyList;