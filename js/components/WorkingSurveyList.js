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
        var link = "#/surveymenu/"+this.props.selectedSurvey.id;
        return (
                <div className="well">
                    <Button href={link} bsStyle="primary" block onClick={() => this.handleClick([this.props.selectedSurvey],"Lower")} bsSize="large">{this.props.selectedSurvey.description} Lower<Glyphicon className="pull-right" glyph="menu-right" /></Button>
                    <Button href={link} bsStyle="primary" block onClick={() => this.handleClick([this.props.selectedSurvey],"Middle")} bsSize="large">{this.props.selectedSurvey.description} Middle<Glyphicon className="pull-right" glyph="menu-right" /></Button>
                    <Button href={link} bsStyle="primary" block onClick={() => this.handleClick([this.props.selectedSurvey],"Upper")} bsSize="large">{this.props.selectedSurvey.description} Upper<Glyphicon className="pull-right" glyph="menu-right" /></Button>
                </div>
            )
    }
});

module.exports = WorkingSurveyList;