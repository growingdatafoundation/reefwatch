import React from 'react'
import $ from 'jquery'
import { Button, Navbar, NavItem, Nav, Glyphicon } from 'react-bootstrap'

var SurveyMenu = React.createClass({
    closePanel: function () {
        $("div.contentPage").animate({
            left: '100%'
        });        
    },
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Button className="pull-right" onClick={this.closePanel}>Back</Button>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#/observation">Observation</NavItem>
                    <NavItem eventKey={2} href="#/timed">Timed Search</NavItem>
                    <NavItem eventKey={3} href="#/">Point Intercept</NavItem>
                    <NavItem eventKey={4} href="#/Quadrat">Species Qudrat Survey</NavItem>
                    <NavItem eventKey={5} href="#/PhotoUpload">Add Photo's</NavItem>
                </Nav>
            </Navbar>
          )
    }
});

module.exports = SurveyMenu;