import React from 'react'
import { Link } from 'react-router'
import DisplaySelectedFieldDay from './components/DisplaySelectedFieldDay'
import PubSub from './helpers/pubsub'

export default React.createClass({
  getInitialState: function() {
      return {"Page":{"Title":"Example", "Data": {"CurrentFieldDay": {"location":"Example", "date": "2016-02-02"}}} };
  },  
  componentDidMount: function() {
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
            <li><Link to="/surveys">Surveys <span className="badge">42</span></Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        <div>
          <h2>{this.state.Page.Title}</h2>
          {this.props.children}
        </div>
      </div>
    )
  }
})
