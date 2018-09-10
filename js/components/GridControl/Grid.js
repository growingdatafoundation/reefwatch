import React from 'react'
import $ from 'jquery'
import GridHeaderRow from './GridHeaderRow'
import GridRow from './GridRow'

var grid = React.createClass({
    render() {
        var fieldArray = [];
        /* Remap column to make fieldnmae the key for each array */
        if (typeof this.props.data !== 'undefined' && typeof this.props.data.columnData !== 'undefined') {
            this.props.data.columnData.forEach(column => {
                fieldArray[column.fieldName] = column;
            });
        }
        return (
                <table ref="gridTable" className="table-header-rotated">
                    {(this.props.data.rows.length>0) ? <GridHeaderRow data={this.props.data.columnData} /> : <thead></thead>}
                    {(this.props.data.rows.length>0) ? <GridRow data={this.props.data.rows} columnData={fieldArray} /> : <tbody></tbody>}
                </table>
            )
    },
});

module.exports = grid;
