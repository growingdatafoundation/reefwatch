import React from 'react'
import $ from 'jquery'
import { FormControl, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'

var WorkingSurveyList = React.createClass({
    handleClick: function (location, survey) {
        $("div.contentPage").animate({
            left: '0px',
        });
    },
    renderButtons: function (selectSurvey) {
        if (selectSurvey && selectSurvey.selectedSites) {
            var result = selectSurvey.selectedSites.map(function (item) {
                var link = "#/surveymenu/" + item.observationId;
                return <Button key={item.siteCode} href={link} bsStyle="primary" block onClick={() => this.handleClick(item, selectSurvey)} bsSize="large">{item.siteCode}<Glyphicon className="pull-right" glyph="menu-right" /></Button>
            }, this);
            return result;
        }
    },
    render() {
        return (
                <div className="well">
                    {this.renderButtons(this.props.selectedSurvey)}
                </div>
            )
    },
});

module.exports = WorkingSurveyList;
