import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
      <div className="selectedFieldDay">selected:{this.props.selectedFieldDay}</div>
        <ul className="nav nav-pills">
            <li className="active"><Link to="/home">Home</Link></li>
            <li><Link to="/surveys">Surveys <span className="badge">42</span></Link></li>
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
