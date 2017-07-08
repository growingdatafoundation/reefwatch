import React from 'react'

var Panel = React.createClass({
    render() {
        return (<div className={"panel panel-"+this.props.type}>
                    <div className="panel-heading">{this.props.heading}</div>
                    <div className="panel-body">{this.props.children}</div>
                </div>)
    }
});

module.exports = Panel;