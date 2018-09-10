
import React from 'react'
import $ from 'jquery'
import GridRowCell from './GridRowCell'

var gridRow = React.createClass({
    createCell: function(row) {
        var rowCells = [];
        Object.keys(row).forEach(function (key) {
            var field = row[key];
            if (typeof this.props.columnData[key] !== 'undefined') {
                rowCells.push(<GridRowCell key={key} fieldKey={key} columnData={this.props.columnData[key]} data={field} row={row} />);
            }
        }, this)
        return rowCells
    },
    render() {
        return (
                <tbody>
                {
                    this.props.data.map(function(row, index) {
                        return (<tr key={"RowID" + index}>
                            { this.createCell(row)}
                        </tr>);
                    }, this)
                }
                </tbody>
            )
    },
});

module.exports = gridRow;
