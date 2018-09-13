import React from 'react'
import  {Link}  from 'react-router'
import DisplaySelectedSurvey from './components/DisplaySelectedSurvey'
import PubSub from './helpers/pubsub'
import * as services from "../data/services"

import { getUser , signOut } from './Bootstrap';

export default React.createClass({
  isLoggedIn:function(){
    return {val:0}
  },
    getInitialState: function() {
        //var auth2 = gapi.auth2.getAuthInstance();
     //   this.setState({ showModal: true })
        return {
            surveyCount: 0,
            user: null,
        };

    },
    componentDidMount: function() {
        services.getSurveyDaysWithLocations(result => this.setState({surveyCount: result.length}));

        getUser()
        .then(user => this.setState({ user }))
        .catch(err => console.log(err)); // eslint-disable-line no-console

    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    logout:function(){
        signOut()
        .then(() => {
          this.setState({ user: null });
          localStorage.removeItem('id_token'); //TODO legacy
          window.location.reload(); //TODO legacy
        });
    },

    render() {
        var HomeClass = this.props.location.pathname === "/" ? "active" : "";
        var SurveyClass = this.props.location.pathname.includes("surveys") ? "active" : "";
        var AdminClass = this.props.location.pathname.includes("admin") ? "active" : "";
        var ExportClass = this.props.location.pathname.includes("export") ? "active" : "";
        var LoginClass = this.props.location.pathname.includes("login") ? "active" : "";

        return (
            <main className="container-fluid">
                <nav className="navbar navbar-default navbar-inverse">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Reefwatch</a>
                        </div>

                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li className={HomeClass}><Link to="/">Home</Link></li>
                                <li className={SurveyClass}><Link to="/surveys">Survey Days <span className="badge">{this.state.surveyCount}</span></Link></li>
                                <li className={AdminClass}><Link to="/admin">Admin</Link></li>
                                <li className={ExportClass}><Link to="/export">Export Data</Link></li>

                                { (this.state.user) &&
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            { this.state.user.email } <span className="caret"></span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a onClick={this.logout}>Logout</a>
                                            </li>
                                        </ul>
                                    </li>
                                }

                                {  !(this.state.user) && <li className={LoginClass}><Link to="/login">Login</Link></li> }

                            </ul>
                        </div>
                    </div>
                </nav>

                <div>
                {this.props.children}
                </div>
            </main>
        )
    },
})
