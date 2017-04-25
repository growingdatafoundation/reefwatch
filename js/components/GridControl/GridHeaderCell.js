import React from 'react'
import $ from 'jquery'

var GridHeaderCell = React.createClass({
    getTextWidth: function (text, font) {
        // re-use canvas object for better performance
        var canvas = this.getTextWidth.canvas || (this.getTextWidth.canvas = document.createElement("canvas"));
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width;
    },
    componentDidUpdate: function () {
        this.renderLabels();
    },
    componentDidMount: function() {
        this.renderLabels();
        window.addEventListener('resize', this.renderLabels);
    },          
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.renderLabels);
    },
    renderLabels: function () {
        console.log("GridHeader Data->"+this.props.data);
        if(this.props.data.IsVertical) {
            var cell = this.refs.tableHeaderCell;
            var x = cell.offsetWidth -17;
            var y = 24;
            cell.style[transformPrefix] = "translate("+x+"px, "+y+"px)";
        }  else {
            var cell = this.refs.tableHeaderCell;
            var x = (cell.offsetWidth/2) - (this.getTextWidth(this.props.data.columnHeaderText, "bold 12pt arial")/2);
            var y = 0;
            cell.style[transformPrefix] = "translate("+x+"px, "+y+"px)";
            cell.style.verticalAlign = "bottom";
        }
    },
    render() {
        var roateColumnText = (this.props.data.IsVertical) ? 'rotate': '';
            return (
            <th ref="tableHeaderCell" style={{display: this.props.data.isHidden}}  className={roateColumnText} key={this.props.key}>
                <div>
                    <span>{this.props.data.columnHeaderText}</span>
                </div>
            </th>
            )
    }
});
   
module.exports = GridHeaderCell;