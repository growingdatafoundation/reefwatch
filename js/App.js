import React from 'react'
import { Link } from 'react-router'
import DisplaySelectedSurvey from './components/DisplaySelectedSurvey'
import PubSub from './helpers/pubsub'
import config from "../config"
import * as services from "../data/services"


export default React.createClass({
    getInitialState: function() {
        //var auth2 = gapi.auth2.getAuthInstance();
        return {surveyCount:0};
    },  
    componentDidMount: function() {
        services.getSurveyDaysWithLocations(result => this.setState({surveyCount: result.length}));
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
  render() {
    var HomeClass = this.props.location.pathname === "/" ? "active" : "";
    var SurveyClass = this.props.location.pathname.includes("surveys") ? "active" : "";
    var AdminClass = this.props.location.pathname.includes("admin") ? "active" : "";
    var ExportClass = this.props.location.pathname.includes("export") ? "active" : "";
    var LoginClass = this.props.location.pathname.includes("login") ? "active" : "";
    return (
      <div>
        <div className="selectedFieldDay"><DisplaySelectedSurvey /></div>
        <ul className="nav nav-pills">
            <li className={HomeClass}><Link to="/">Home</Link></li>
            <li className={SurveyClass}><Link to="/surveys">Survey Days <span className="badge">{this.state.surveyCount}</span></Link></li>
            <li className={AdminClass}><Link to="/admin">Admin</Link></li>
            <li className={ExportClass}><Link to="/export">Export Data</Link></li>
            <li className={LoginClass}><Link to="/login">Login</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
})
