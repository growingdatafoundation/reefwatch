import React from 'react'
import { render } from 'react-dom'
import jquery from 'jquery'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './js/App'
import Login from './js/Login'
import TimedSearch from './js/TimedSearch'
import Quadrat from './js/Quadrat'
import Admin from './js/Admin'
import Surveys from './js/Surveys'
import Home from './js/Home'
import Observation from './js/Observation'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/home" component={Home}/>
      <Route path="/surveys" component={Surveys}/>
      <Route path="/observation" component={Observation}/>
      <Route path="/timed" component={TimedSearch}/>
      <Route path="/quadrat" component={Quadrat}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/login" component={Login}/>
    </Route>
    <Route path="/*" component={App}>
      <Route path="/home" component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'))
