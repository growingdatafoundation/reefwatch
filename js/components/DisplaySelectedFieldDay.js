import React from 'react'

var DisplaySelectedFieldDay = React.createClass({
  getInitialState: function () {
    return {"location":null,"date":null};      
  },
  componentDidMount: function () {
    $.subscribe("selectFieldDay", this.updateSelectedFieldDay);
  },
  componentWillUnmount: function () {
    $.unsubscribe("selectFieldDay");     
  },
  updateSelectedFieldDay: function (e, state) {
    this.setState(state);    
  },
  render() {
    return (
        <div>{(this.state.location)? this.state.location + " (" + this.state.date+")":""}</div>
        )
  }
});

module.exports = DisplaySelectedFieldDay;