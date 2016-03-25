import React from 'react'
import { Link } from 'react-router'

export default React.createClass({  
  render() {
    return (
      <div className="nav">
        <ul>
            <li><Link to="/observation">Observation</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
