import React from 'react'
import { Link } from 'react-router'
import DisplaySelectedFieldDay from './components/DisplaySelectedFieldDay'
import PubSub from './helpers/pubsub'
import config from "../config"


export default React.createClass({
    getInitialState: function() {
        //var auth2 = gapi.auth2.getAuthInstance();
        return {fieldDayCount:0};
    },  
    componentDidMount: function() {
        var that = this;
        this.serverRequest = $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/SurveyDays", function (result) {
            that.setState({
                fieldDayCount: result.length
            });
        })
        .done(function() {
        })
        .fail(function(jqXHR, textStatus, errorThrown) { 
        })
        .always(function() {
        });
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
  render() {
    var HomeClass = location.pathname === "/" ? "active" : "";
    var SurveyClass = location.pathname.match(/^\/surveys/) ? "active" : "";
    var AdminClass = location.pathname.match(/^\/admin/) ? "active" : "";
    var ExportClass = location.pathname.match(/^\/export/) ? "active" : "";
    var LoginText = "Login";
    return (
      <div>
        <div className="selectedFieldDay"><DisplaySelectedFieldDay /></div>
        <ul className="nav nav-pills">
            <li className={HomeClass}><Link to="/">Home</Link></li>
            <li className={SurveyClass}><Link to="/surveys">Survey Days <span className="badge">{this.state.fieldDayCount}</span></Link></li>
            <li className={AdminClass}><Link to="/admin">Admin</Link></li>
            <li className={ExportClass}><Link to="/export">Export Data</Link></li>
            {/*<li><a href={config.api.hostname + ":"+config.api.port+"/auth/login/dummy?user_name=njhill&user_handle=Nathan%20Hill"}>{LoginText}</a></li>*/}
            <li><a href={config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"auth/callback/google"}>{LoginText}</a></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
})
