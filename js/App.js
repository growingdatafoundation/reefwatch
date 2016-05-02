import React from 'react'
import { Link } from 'react-router'
import DisplaySelectedFieldDay from './components/DisplaySelectedFieldDay'
import PubSub from './helpers/pubsub'
import config from "../config"


export default React.createClass({
    getInitialState: function() {
        return {fieldDayCount:0};
    },  
    componentDidMount: function() {
        var that = this;
        this.serverRequest = $.get(config.api.hostname + ":"+config.api.port+"/api/v1/field_days?num="+Math.random(), function (result) {
            that.setState({
                fieldDayCount: result.data.length
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
    return (
      <div>
        <div className="selectedFieldDay"><DisplaySelectedFieldDay /></div>
        <ul className="nav nav-pills">
            <li className="active"><Link to="/home">Home</Link></li>
            <li><Link to="/surveys">Field Days <span className="badge">{this.state.fieldDayCount}</span></Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
})
