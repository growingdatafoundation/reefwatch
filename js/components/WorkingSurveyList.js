import React from 'react'
import $ from 'jquery'
import { FormControl, Button, Glyphicon } from 'react-bootstrap'
import SurveyMenu from './SurveyMenu'

var WorkingSurveyList = React.createClass({
    handleClick: function (location, survey) {
        alert(location + " " + survey);
    },
    render() {
        return (
                <div className="well">
                    <Button bsStyle="primary" block onClick={() => this.handleClick([this.props.selectedSurvey],"Lower")} bsSize="large">{this.props.selectedSurvey} Lower<Glyphicon className="pull-right" glyph="menu-right" /></Button>
                    <Button bsStyle="primary" block onClick={() => this.handleClick([this.props.selectedSurvey],"Middle")} bsSize="large">{this.props.selectedSurvey} Middle<Glyphicon className="pull-right" glyph="menu-right" /></Button>
                    <Button bsStyle="primary" block onClick={() => this.handleClick([this.props.selectedSurvey],"Upper")} bsSize="large">{this.props.selectedSurvey} Upper<Glyphicon className="pull-right" glyph="menu-right" /></Button>
                </div>
            )
    }
});

module.exports = WorkingSurveyList;