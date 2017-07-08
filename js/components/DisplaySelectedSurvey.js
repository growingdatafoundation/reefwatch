import React from 'react'
import $ from 'jquery'

var DisplaySelectedSurvey = React.createClass({
  getInitialState: function () {
    return {"location":null,"date":null};      
  },
  componentDidMount: function () {
    $.subscribe("selectSurvey", this.updateSelectedSurvey);
  },
  componentWillUnmount: function () {
    $.unsubscribe("selectSurvey");     
  },
  updateSelectedSurvey: function (e, state) {
    this.setState(state);    
  },
  render() {
    return (
        <div>{(this.state.location)? this.state.location + " (" + this.state.date+")":""}</div>
        )
  }
});

module.exports = DisplaySelectedSurvey;