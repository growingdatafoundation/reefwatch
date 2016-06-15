import React from 'react'
import $ from 'jquery'

var GridHeaderCell = React.createClass({
    componentDidMount: function() {
        var cell = this.refs.tableHeaderCell;
        var x = cell.offsetWidth -17;
        var y = 24;
        cell.style[transformPrefix] = "translate("+x+"px, "+y+"px)";  
    },          
    render() {
        var roateColumnText = (this.props.data.IsVertical) ? 'rotate': '';
            return (
            <th ref="tableHeaderCell" className={roateColumnText} key={this.props.key}>
                <div>
                    <span>{this.props.data.columnHeaderText}</span>
                </div>
            </th>
            )
    }
});
   
module.exports = GridHeaderCell;