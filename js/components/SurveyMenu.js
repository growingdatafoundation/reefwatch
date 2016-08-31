import React from 'react'
import $ from 'jquery'
import { Button, Navbar, NavItem, Nav, Glyphicon } from 'react-bootstrap'
import config from "../../config"

var SurveyMenu = React.createClass({
    closePanel: function () {
        $("div.contentPage").animate({
            left: '100%'
        });        
    },
    loadSurvey: function () {
        var that = this;
        if(this.props.selectedFieldDayID) {
            this.serverRequest = $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"field_days/"+this.props.selectedFieldDayID+"?num="+Math.random(), function (result) {
                that.setState({
                    survey: result
                });
            })
            .done(function() {
            })
            .fail(function(jqXHR, textStatus, errorThrown) { 
            })
            .always(function() {
            });
        }
    },
    getInitialState: function() {
        return {"survey":{}};
    },  
    componentDidMount: function() {
        this.loadSurvey();
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    componentDidUpdate: function (prevProps, prevState) {
        if(prevProps.selectedFieldDayID!=this.props.selectedFieldDayID) {
            this.loadSurvey();
        }
    },
    render() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Button className="pull-right" onClick={this.closePanel}>Back</Button>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#/observation">Observation</NavItem>
                    <NavItem eventKey={2} href="#/timed">Timed Search</NavItem>
                    <NavItem eventKey={3} href="#/intercept">Point Intercept</NavItem>
                    <NavItem eventKey={4} href="#/quadrat">Species Quadrat Survey</NavItem>
                    <NavItem eventKey={5} href="#/photoUpload">Add Photo's</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={6} href="#">{this.state.survey.description}</NavItem>
                </Nav>
            </Navbar>
          )
    }
});

module.exports = SurveyMenu;