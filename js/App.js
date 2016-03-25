import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div className="nav">
        <ul className="nav nav-pills">
            <li className="active"><Link to="/home">Home</Link></li>
            <li><Link to="/surveys">Surveys <span class="badge">42</span></Link></li>
            <li><Link to="/observation">Observation</Link></li>
            <li><Link to="/timed">Timed Search</Link></li>
            <li><Link to="/quadrat">Quadrat</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
