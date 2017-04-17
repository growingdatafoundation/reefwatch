import React from 'react'
import $ from 'jquery'
import { Button, Navbar, NavItem, Nav, Glyphicon } from 'react-bootstrap'
import config from "../../config"
import * as services from "../../data/services"
import {browserHistory} from "react-router";

var SurveyMenu = React.createClass({
    closePanel: function () {
        $("div.contentPage").animate({
            left: '100%'
        });        
    },
    loadSurvey: function () {
        if(this.props.observationId) {
            console.log("Loading Observation");
            this.setState({activeKey:1});
            //load observation friendly display in menu needs to be done
            //services.GetObservation(this.props.observationId, result => this.setState({observation: result}));
        }
    },
    getInitialState: function() {
        return {"observation":{},activeKey:1};
    },  
    componentDidMount: function() {
        this.loadSurvey();
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    componentDidUpdate: function (prevProps, prevState) {
        if(prevProps.observationId!=this.props.observationId) {
            this.loadSurvey();
        }
    },
    handleSelect(selectedKey, e) {
        this.setState({activeKey:selectedKey});
         window.location.hash = e.target.hash;
    },
    render() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Button className="pull-right" onClick={this.closePanel}>Back</Button>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                    <NavItem eventKey={1} href={"#/observation/"+this.props.observationId}>Observation</NavItem>
                    <NavItem eventKey={2} href={"#/timed/"+this.props.observationId}>Timed Search</NavItem>
                    <NavItem eventKey={3} href={"#/intercept/"+this.props.observationId}>Point Intercept</NavItem>
                    <NavItem eventKey={4} href={"#/quadrat/"+this.props.observationId}>Species Quadrat Survey</NavItem>
                    <NavItem eventKey={5} href={"#/photoUpload/"+this.props.observationId}>Add Photo's</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={6} href="#">{this.props.observationId}</NavItem>
                </Nav>
            </Navbar>
          )
    }
});

module.exports = SurveyMenu;