import React from 'react'
import $ from 'jquery'
import { FormControl, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'
import * as services from "../../data/services"


var WorkingSurveyList = React.createClass({
    getInitialState: function() {
        var buttons = { buttons: []};
        return buttons
    },
    handleClick: function (location, survey) {
        $("div.contentPage").animate({
            left: '0px'
        });       
    },
    renderButtons: function (selectSurvey) {
        if(selectSurvey!=null && selectSurvey.selectedSites != null) {
            var link = "#/surveymenu/"+this.props.selectedSurvey.id;
            var result = selectSurvey.selectedSites.forEach(function (item) {
                if(item.observationID === null || item.observationID === "") {
                    //create observation id
                    services.AddObservations({ surveyDayId: this.props.selectedSurvey.id}, (result, item) => this.createObservation);
                } else {
                    //Create Button
                    //this.createButton(item, link);
                }
            }, this);
            return result;
        }
    },
    createObservation: function (result, item) {
        alert(item.siteCode);
    },
    createButton: function(item, link) {
        var button = <Button key={item.siteCode} href={link} bsStyle="primary" block onClick={() => this.handleClick(item, selectSurvey)} bsSize="large">{item.siteCode}<Glyphicon className="pull-right" glyph="menu-right" /></Button>
        var buttons = this.state.buttons;
        buttons.push(button);
        this.setState({ buttons: buttons})

    },
    render() {
        return (
                <div className="well">
                    {this.renderButtons(this.props.selectedSurvey)}{this.state.buttons}
                </div>
            )
    }
});

module.exports = WorkingSurveyList;