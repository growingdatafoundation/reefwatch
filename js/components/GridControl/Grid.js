import React from 'react'
import $ from 'jquery'
import GridHeaderRow from './GridHeaderRow'
import GridRow from './GridRow'

var grid = React.createClass({
    buildAssociatedArrayByFieldName: function () {
        var fieldArray = new Array();
        this.props.data.columnData.forEach(column => {
            fieldArray[column.fieldName] = column;
        });
        return fieldArray;       
    },
    render() {
        return (
                <table ref="gridTable" className="table-header-rotated">
                    <GridHeaderRow data={this.props.data.columnData} />
                    <GridRow data={this.props.data.rows} columnData={this.buildAssociatedArrayByFieldName()} />
                </table>
            )
    }
});

module.exports = grid;