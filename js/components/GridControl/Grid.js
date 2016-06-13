import React from 'react'
import $ from 'jquery'
import GridHeaderRow from './GridHeaderRow'
import GridRow from './GridRow'

var grid = React.createClass({
    render() {
        return (
                <table className="table-header-rotated">
                    <GridHeaderRow data={this.props.data.columnData} />
                    <GridRow data={this.props.data} />
                </table>
            )
    }
});

module.exports = grid;