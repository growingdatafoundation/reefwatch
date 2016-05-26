import React from 'react'
import { render } from 'react-dom'
import jquery from 'jquery'

import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import App from './js/App'
import Login from './js/Login'
import TimedSearch from './js/TimedSearch'
import Quadrat from './js/Quadrat'
import Admin from './js/Admin'
import Surveys from './js/Surveys'
import Home from './js/Home'
import Observation from './js/Observation'
import PhotoUpload from './js/PhotoUpload'
import SurveyMenu from './js/SurveyMenu'
import ExportData from './js/ExportData'
import PointIntercept from './js/PointIntercept'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/home" component={Home}/>
      <Route path="/surveys" component={Surveys}>
        <Route path="/surveymenu" component={SurveyMenu}>
          <Route path="/observation" component={Observation}/>
          <Route path="/timed" component={TimedSearch}/>
          <Route path="/quadrat" component={Quadrat}/>
          <Route path="/intercept" component={PointIntercept}/>
          <Route path="/photoupload" component={PhotoUpload}/>
        </Route>
      </Route>
      <Route path="/admin" component={Admin}/>
      <Route path="/export" component={ExportData}/>
      <Route path="/login" component={Login}/>
    </Route>
  </Router>
), document.getElementById('app'))
