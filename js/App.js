import React from 'react'
import  {Link}  from 'react-router'
import DisplaySelectedSurvey from './components/DisplaySelectedSurvey'
import PubSub from './helpers/pubsub'
import * as services from "../data/services"

export default React.createClass({
  isLoggedIn:function(){
    return {val:0}
  },
    getInitialState: function() {
        //var auth2 = gapi.auth2.getAuthInstance();
     //   this.setState({ showModal: true })
        return {surveyCount:0};

    },
    componentDidMount: function() {
        services.getSurveyDaysWithLocations(result => this.setState({surveyCount: result.length}));
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    logout:function(){
      localStorage.removeItem('id_token');
      window.location.reload()
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
            <li>{(localStorage.getItem('id_token')!==null) ? (<button className="btn btn-danger log" onClick={this.logout}>Log out </button>) :(<div className={LoginClass}></div>)}</li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  },
})
