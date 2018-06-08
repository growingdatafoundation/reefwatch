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
import changePassword from './js/PasswordChange'
import welcome from './js/Welcome'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="/home" component={Home}></Route>
      <Route path="/surveys" component={Surveys}>
        <Route path="/surveymenu/:observationId" component={SurveyMenu}>
          <IndexRoute component={Observation} />
          <Route path="/observation/:observationId" component={Observation}></Route>
          <Route path="/timed/:observationId" component={TimedSearch}></Route>
          <Route path="/quadrat/:observationId" component={Quadrat}></Route>
          <Route path="/intercept/:observationId" component={PointIntercept}></Route>
          <Route path="/photoupload/:observationId" component={PhotoUpload}></Route>
        </Route>
      </Route>
      <Route path="/admin" component={Admin}></Route>
      <Route path="/export" component={ExportData}></Route>
      <Route path="/login" component={Login}> </Route> 
      <Route path="/changepassword" component={changePassword}> </Route> 
     </Route>
  </Router>
), document.getElementById('app'))
