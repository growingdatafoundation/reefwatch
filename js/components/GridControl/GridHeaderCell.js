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

        let cell = null;
        let x = 0;
        let y = 0;

        if (this.props.data.IsVertical) {
            cell = this.refs.tableHeaderCell;
            x = cell.offsetWidth - 17;
            y = 24;
            cell.style.transform = "translate(" + x + "px, " + y + "px)";
        }  else {
            cell = this.refs.tableHeaderCell;
            x = (cell.offsetWidth / 2) - (this.getTextWidth(this.props.data.columnHeaderText, "bold 12pt arial") / 2);
            y = 0;
            cell.style.transform = "translate(" + x + "px, " + y + "px)";
            cell.style.verticalAlign = "bottom";
        }
    },
    render() {
        var roateColumnText = (this.props.data.IsVertical) ? 'rotate' : '';
            return (
            <th ref="tableHeaderCell" style={{display: this.props.data.isHidden}}  className={roateColumnText} key={this.props.key}>
                <div>
                    <span>{this.props.data.columnHeaderText}</span>
                </div>
            </th>
            )
    },
});

module.exports = GridHeaderCell;
