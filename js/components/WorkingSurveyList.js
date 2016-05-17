import React from 'react'
import $ from 'jquery'
import { FormControl, Tabs, Tab } from 'react-bootstrap'
import SurveyMenu from './SurveyMenu'

var WorkingSurveyList = React.createClass({
        handleSelect(eventKey) {
        event.preventDefault();
        alert("selected ${eventKey}");
    },
    render() {
        return (
                <div>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Lower">
                            <SurveyMenu />    
                        </Tab>
                        <Tab eventKey={2} title="Middle">
                            <SurveyMenu />    
                        </Tab>
                        <Tab eventKey={3} title="Upper">
                            <SurveyMenu />    
                        </Tab>
                    </Tabs>
                </div>
            )
    }
});

module.exports = WorkingSurveyList;