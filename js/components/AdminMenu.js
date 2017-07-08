import React from 'react'
import $ from 'jquery'
import { Button, Navbar, NavItem, Nav, Glyphicon } from 'react-bootstrap'

var AdminMenu = React.createClass({
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
                        Administration
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#/observation">Observation</NavItem>
                </Nav>
            </Navbar>
          )
    }
});

module.exports = AdminMenu;